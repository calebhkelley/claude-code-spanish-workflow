---
name: "verbos-frecuentes-espanol"
description: "Extend, update or recalibrate the Spanish verb frequency list (ranks 1–450 exist). Use for adding rank bands, reworking glosses and examples, or changing the corpus behind the ranking."
---

# Spanish verb frequency list

Caleb keeps a corpus-derived, frequency-ranked list of Spanish verb lemmas with conjugated key forms, irregularity classification, glosses and examples. It feeds teaching materials for SPAN 201 and SPAN 212 and his own reference. This skill holds the pipeline plus the calibration tables that have accumulated from auditing it.

## Current state

- Master file: `300-verbos-mas-frecuentes-espanol.xlsx`. Ask Caleb for it before doing anything; do not rebuild ranks that already exist.
- Ranks 1–450 are fully annotated. Sheet `Verbos 1–300` holds 1–300, sheet `Verbos 301–450` holds the next tier. Both use the identical 14-column layout below.
- Supporting sheets: `Índice de irregularidades` (each pattern to its verb set), `Bandas` (per-50 counts and cumulative coverage), `Método y fuentes` (provenance and caveats, in Spanish).
- Caleb may also have `extraer_verbos_frecuentes.py`, the packaged pipeline. If he does, run and edit that instead of rewriting it, and port any new calibration entries back into it.

## Column layout, in this order

`Rango` · `Infinitivo` · `Significado (inglés)` · `Conjugación` (-ar/-er/-ir) · `Tipo` · `Irregularidades` · `1.ª sg. presente` · `3.ª sg. pretérito` · `Participio` · `Gerundio` · `Ejemplo` · `Notas de uso` · `Frec. por millón` · `Banda`

`Tipo` is three-way and the distinction matters pedagogically. `Regular`; `Regular (cambio ortográfico)` when every tag is an `ortográfico …` tag, so *buscar* and *llegar* are not lumped in with *tener*; `Irregular` otherwise.

3sg is the right preterite person because that is where the -ir stem raising shows (*pidió*, *durmió*, *sintió*).

Styling: header row filled `2F5D62` with white bold text, alternating row fill `F7F9F9`, `freeze_panes='C2'`, autofilter over the whole range, gridlines off, wrap text on the gloss, irregularity, example and usage columns, the four conjugated forms in italics.

## Pipeline

Deps: `pip install wordfreq simplemma verbecc openpyxl`. Under Cowork add `--break-system-packages`. Name no working file `inspect.py`; it shadows a stdlib module verbecc imports and the run dies with a circular-import error.

### 1. Rank the lemmas

```python
import collections, wordfreq, simplemma
VERBALES = ('ando','iendo','yendo','aron','ieron','aba','ía','ó','ió','aré','eré','iré',
            'amos','emos','imos','aste','iste','ara','iera','ase','iese','ado','ido')

def ranking(n_max, muestra=250_000):
    agg = collections.Counter()
    for w in wordfreq.top_n_list('es', muestra):
        if not w.isalpha():
            continue
        lema = simplemma.lemmatize(w, 'es')
        f = wordfreq.word_frequency(w, 'es')
        if f <= 0:
            continue
        clave = lema[:-2] if (lema.endswith(('arse','erse','irse')) and len(lema) > 5) else lema
        if w in EXCLUIR_FORMAS.get(clave, ()):
            continue
        agg[clave] += f

    def es_verbo(lema):
        if len(lema) < 2 or not lema.endswith(('ar','er','ir','ír')):
            return False
        b = lema[:-2]
        return any(wordfreq.word_frequency(b + s, 'es') > 0 for s in VERBALES)

    out = []
    for lema, f in agg.most_common(40_000):
        if lema in DESCARTAR or not es_verbo(lema):
            continue
        out.append((lema, round(f * 1e6, 2)))
        if len(out) >= n_max:
            break
    return out
```

The `len(lema) < 2` guard is deliberate. An earlier `< 4` silently dropped *ser*, *ir*, *dar* and *ver*, and the list looked plausible with *haber* at rank 1. Whenever you change this function, assert that *ser*, *haber*, *estar*, *tener*, *poder*, *hacer*, *ir*, *decir*, *ver* and *dar* are the first ten.

Pronominal lemmas fold into the base verb, so *ponerse* counts inside *poner*. `Frec. por millón` is the summed occurrences per million of every form of the lemma.

Past roughly rank 650 pass `muestra=400_000` or higher. The script reports when it cannot fill the requested range.

### 2. Conjugate

```python
import json, re
from verbecc import CompleteConjugator
PRON = re.compile(r'^(yo|tú|vos|él|ella|usted|nosotros|nosotras|vosotros|vosotras|'
                  r'ellos|ellas|ustedes|no|que)\s+')

cg = CompleteConjugator('es')

def elegir(entradas, persona, numero='s'):
    for e in entradas:
        if e.get('p') == persona and e.get('n') == numero:
            c = [x for x in e.get('c', []) if x]
            if c:
                return PRON.sub('', c[0]).strip()
    return ''

c = cg.conjugate(lema)
d = json.loads(str(c._moods_conjugation))
pres1s = elegir(d['indicativo']['presente'], '1')
pret3s = elegir(d['indicativo']['pretérito-perfecto-simple'], '3')
part   = [x for x in d['participo']['participo'][0]['c'] if x][0]
ger    = [x for x in d['gerundio']['gerundio'][0]['c'] if x][0]
inventado = bool(getattr(c._verb_info, 'predicted', False))
```

Select the person by the `p` and `n` fields, never by list index. Spanish includes *vos*, so index 2 is not 3sg.

Then apply `FORMAS_A_MANO` and `PARTICIPIOS` from the calibration tables below.

### 3. Classify the irregularity

Compare each generated form against the regular prediction and tag the differences. Tag vocabulary, all in Spanish, reused exactly so the index sheet stays stable across versions:

`presente irregular` · `raíz e→ie` · `raíz o→ue` · `raíz u→ue` · `raíz i→ie` · `raíz e→i` · `1.ª sg. -go` · `1.ª sg. -zco` · `pretérito fuerte` · `cambio vocálico en pretérito` · `i→y (3.ª sg./pl.)` · `inserción de y (-uir)` · `gerundio -yendo` · `participio irregular` · `participio con tilde (-ído)` · `acento en la raíz (í/ú)` · `futuro/condicional irregular` · `ortográfico c→qu` · `ortográfico g→gu` · `ortográfico z→c` · `ortográfico g→j` · `ortográfico c→z` · `ortográfico gu→g`

Three things the comparison cannot infer and that need membership sets.

- `raíz e→i` cannot be detected from the forms because *seguir* gives stem *sig*, so nothing ends in *i*. Set: pedir, servir, seguir, conseguir, perseguir, elegir, repetir, medir, vestir, despedir, impedir, rendir, reír, corregir, competir, sonreír, freír, teñir, gemir, derretir, ceñir, regir, concebir, colegir.
- `presente irregular` for the wholly irregular presents: ser, ir, estar, haber, dar, ver, saber, caber.
- `futuro/condicional irregular`: tener, poner, salir, venir, valer, poder, querer, saber, haber, hacer, decir, caber, satisfacer, plus the *-tener*, *-poner* and *prever* derivatives.

Two traps. Do not tag `1.ª sg. -go` on *-guir* verbs; *sigo* ends in *go* by orthography, not by consonant insertion. And exclude *-car/-gar/-zar* verbs from the `-go`/`-zo` checks so *pago* and *cruzo* are not mislabeled.

### 4. Audit, never skip this

Print for manual review every verb where any of these holds, then read the list.

- `inventado` is true. The verb is absent from verbecc’s dictionary and the forms were invented by analogy. This is how *atrever* came back as *atreveo, atrevio, atrevisto*.
- The participle does not end in `-ado`, `-ido` or `-ído`. verbecc substitutes the adjectival participle for the verbal one, which produced *junto* for *juntar*, *suspenso* for *suspender*, *confeso* for *confesar*, *bendito* for *bendecir*, *electo* for *elegir*. Correct forms (*hecho*, *visto*, *puesto*, *escrito*, *abierto*, *inscrito*, *satisfecho*) also surface here, so this is a confirm list rather than an error list.
- A present not ending in `o`, `oy`, `é` or `e`; an *-ar* preterite not ending in `ó` outside estar, dar and andar; an *-er/-ir* preterite not ending in `ió`, `yó` or `o`; a gerund not ending in `ando`, `iendo` or `yendo`.

Also read the `Infinitivo` column straight through. The lemmatizer manufactures non-verbs from unrelated words and the rate climbs with depth, from roughly one in thirty above rank 450 to one in fifteen below it. Every new one goes into `DESCARTAR`.

### 5. Write the glosses, examples and usage notes

This is the part no tool does. Per verb.

- Gloss: the English senses, most frequent first, comma-separated. Disambiguate merged homonyms, as in `to count; to tell` for *contar*.
- Example: one short natural sentence showing the typical construction, not a dictionary frame. Prefer contexts a student would meet.
- Usage note: only where it earns its place. Complement prepositions (*acordarse de*, *insistir en*), contrasts students confuse (*pedir* against *preguntar*, *ser* against *estar*), false friends (*pretender*, *asistir*, *atender*, *realizar*, *revisar*), gustar-type dative syntax, regional splits, register flags.

Register and regional flags are not optional. *joder* sits around rank 165 on real spoken frequency and must be marked vulgar. *coger* carries its note about the vulgar sexual sense across much of Latin America. *manejar*, *extrañar*, *agregar*, *regresar*, *ubicar*, *involucrar*, *brindar* and *armar* get an American or Peninsular note.

Writing constraints for anything in these cells or in material derived from the list.

- Curly apostrophes throughout, never straight ones.
- No em dashes.
- No colons bridging or introducing ideas. Parentheses or a semicolon instead.
- Oxford comma in English, never in Spanish.
- Do not steer students toward *vosotros*. Caleb uses it himself when he speaks in class; whether students adopt it is their choice, so examples should not push it either way.

## Recalibrating

The ranking reflects whatever corpus stands behind it, and that is the main lever.

- Default is wordfreq’s blended register, mixing subtitles, press, Wikipedia, books, web and social media, pan-Hispanic. Press inflates *publicar*, *declarar* and *destacar*; subtitles inflate *joder* and *coger*.
- For a spoken-leaning list, rank from the OpenSubtitles frequency lists at `raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/es/` and lemmatize the same way.
- To cross-check an ordering, compare against Davies’ *A Frequency Dictionary of Spanish* lemma ranks.

By around rank 500 adjacent verbs differ by a few occurrences per million, inside corpus noise. Treat the band of fifty as the meaningful unit and say so rather than defending an exact position. Keep `Método y fuentes` current whenever the corpus, the cleanup or the correction tables change.

## Calibration tables, extend these as you find cases

`DESCARTAR`, lemmas the lemmatizer builds from non-verbal words:

```
mar par militar particular taller super bar placer regular titular circular solar
salar vengar amigar vivar parir florar aforar seriar jamar segurar verter lindar
ultimar salgar cagar pesar nuclear datar timar peter
```

`EXCLUIR_FORMAS`, contaminating wordforms subtracted from a real verb’s count:

```python
{'unir':   {'unidos','unido','unidas','unida'},   # Estados Unidos, Reino Unido
 'vestir': {'visto','viste','vistos','vistas'},   # participle of ver
 'sentar': {'sentido'}}                           # participle of sentir
```

`PARTICIPIOS`, verbal participle restored over verbecc’s adjectival one:

```python
{'incluir':'incluido','nacer':'nacido','expresar':'expresado','comprender':'comprendido',
 'despertar':'despertado','pretender':'pretendido','fijar':'fijado','salvar':'salvado',
 'extender':'extendido','atender':'atendido','poseer':'poseído','dividir':'dividido',
 'concluir':'concluido','convencer':'convencido','manifestar':'manifestado',
 'confundir':'confundido','difundir':'difundido','elegir':'elegido','juntar':'juntado',
 'suspender':'suspendido','confesar':'confesado','bendecir':'bendecido'}
```

`FORMAS_A_MANO`, full overrides where verbecc fails or lags the current norm:

```python
{'pasar':    ('paso','pasó','pasado','pasando'),
 'resultar': ('resulto','resultó','resultado','resultando'),
 'suceder':  ('sucedo','sucedió','sucedido','sucediendo'),
 'prever':   ('preveo','previó','previsto','previendo'),
 'reír':     ('río','rio','reído','riendo'),      # Ortografía 2010, rio with no accent
 'atrever':  ('atrevo','atrevió','atrevido','atreviendo')}
```

The 2010 orthography point generalizes. Monosyllables written without an accent include *rio*, *guion*, *truhan*, *fio* and *lio*, and verbecc still accents several of them.

## Delivering

Add new bands as new sheets in the master workbook rather than new files, keeping one workbook as the single source. Rebuild `Índice de irregularidades` and `Bandas` after any change, since both are derived. Say plainly in the reply which ranks were added, which forms the audit flagged, and what was corrected by hand.