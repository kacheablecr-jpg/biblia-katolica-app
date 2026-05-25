import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const C = {
  fondo:   '#0f172a',
  card:    '#1e293b',
  texto:   '#f1f5f9',
  sub:     '#94a3b8',
  acento:  '#fbbf24',
  borde:   '#334155',
  bg:      '#451a03',
  bgLight: '#78350f',
}

interface Punto {
  titulo: string
  texto:  string
  cita?:  string
}

interface Pregunta {
  id:        string
  emoji:     string
  categoria: string
  pregunta:  string
  intro:     string
  puntos:    Punto[]
  conclusion:string
}

const PREGUNTAS: Pregunta[] = [
  {
    id:        '1',
    emoji:     '👨‍👩‍👧‍👦',
    categoria: 'Génesis y Creación',
    pregunta:  '¿Cómo somos todos descendientes de Adán y Eva si solo ellos existían?',
    intro:
      'Es una de las preguntas más frecuentes sobre el Génesis. La respuesta está en el mismo texto bíblico, aunque muchos no conocen este detalle clave.',
    puntos: [
      {
        titulo: 'Adán y Eva tuvieron muchos más hijos',
        texto:
          'La mayoría conoce a Caín y Abel, y luego a Set. Pero el Génesis dice claramente que Adán y Eva tuvieron muchos más hijos e hijas a lo largo de sus vidas.',
        cita: '«Después del nacimiento de Set, Adán vivió 800 años más y tuvo otros hijos e hijas.»\n— Génesis 5:4',
      },
      {
        titulo: 'Caín ya temía a otras personas',
        texto:
          'Después de matar a Abel, Caín le dijo a Dios que tenía miedo de que lo mataran. Si solo existían Adán y Eva, ¿a quién le tenía miedo? A sus propios hermanos y sobrinos que ya habían nacido.',
        cita: '«Cualquiera que me encuentre me matará.»\n— Génesis 4:14',
      },
      {
        titulo: 'Caín tomó esposa en la tierra de Nod',
        texto:
          'Cuando Caín fue desterrado y llegó a la tierra de Nod, "conoció a su mujer". Esa mujer no vino de la nada — era una hermana o sobrina suya, hija también de Adán y Eva.',
        cita: '«Caín conoció a su mujer, la cual concibió y dio a luz a Enoc.»\n— Génesis 4:17',
      },
      {
        titulo: '¿Por qué los hermanos se casaron entre sí?',
        texto:
          'En las primeras generaciones fue la única posibilidad para poblar la tierra. Más tarde, en la Ley de Moisés (Levítico 18), Dios prohibió estas uniones — para ese entonces ya había suficiente población y las mutaciones genéticas acumuladas hacían esas uniones peligrosas.',
      },
      {
        titulo: 'El mensaje central del Génesis',
        texto:
          'El libro del Génesis no pretende ser un registro genealógico completo. Su mensaje central es que toda la humanidad tiene un origen común y que todos somos iguales en dignidad ante Dios. Ese es el punto teológico, no el mecanismo biológico.',
      },
    ],
    conclusion:
      'En resumen: Adán y Eva tuvieron decenas de hijos e hijas (Gén 5:4). Las primeras generaciones se emparejaron entre hermanos y primos por necesidad. Con el tiempo la población creció, y Dios luego prohibió esas uniones en la Ley de Moisés. La Biblia no contradice la pregunta — la responde.',
  },
  {
    id:        '2',
    emoji:     '🐋',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿Realmente estuvo Jonás tres días dentro de un pez?',
    intro:
      'El relato de Jonás es uno de los más conocidos y también de los más cuestionados. ¿Qué dice realmente la Biblia y qué nos quiere enseñar?',
    puntos: [
      {
        titulo: 'Lo que dice el texto',
        texto:
          'El libro de Jonás narra que el profeta intentó huir de Dios en barco. Una tormenta sacudió la nave y Jonás fue arrojado al mar. Allí, "el Señor preparó un gran pez" que lo tragó.',
        cita: '«El Señor preparó un gran pez para que se tragara a Jonás, y Jonás estuvo en el vientre del pez tres días y tres noches.»\n— Jonás 1:17',
      },
      {
        titulo: 'Jesús mismo lo tomó como real',
        texto:
          'Lo más significativo es que Jesús citó el signo de Jonás como profecía de su propia resurrección: tres días en el sepulcro, igual que Jonás en el pez. Esto da al relato una importancia teológica enorme.',
        cita: '«Así como Jonás estuvo tres días y tres noches en el vientre del gran pez, así también el Hijo del Hombre estará tres días y tres noches en el corazón de la tierra.»\n— Mateo 12:40',
      },
      {
        titulo: 'El mensaje más allá del pez',
        texto:
          'El libro de Jonás enseña que la misericordia de Dios no tiene límites — ni de raza ni de pueblo. Los ninivitas, enemigos de Israel, se convirtieron y Dios los perdonó. Jonás se enojó con eso, y Dios le preguntó: ¿no debería compadecer a esa gran ciudad? El pez es el vehículo; la misericordia universal es el mensaje.',
        cita: '«¿Y no habré yo de tener lástima de Nínive, aquella gran ciudad donde hay más de ciento veinte mil personas?»\n— Jonás 4:11',
      },
    ],
    conclusion:
      'La fe cristiana ha leído el relato de Jonás tanto como historia real como como signo profético de la resurrección. Jesús lo tomó en serio. Más allá del debate sobre el pez, el mensaje es poderoso: nadie escapa a la misericordia de Dios, y esa misericordia es para todos los pueblos.',
  },
  {
    id:        '3',
    emoji:     '🖊️',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia acerca de los tatuajes?',
    intro:
      'Hay un solo versículo en toda la Biblia que menciona los tatuajes directamente. Pero para entenderlo bien hay que conocer su contexto histórico y qué dice el Nuevo Testamento sobre el tema.',
    puntos: [
      {
        titulo: 'El único versículo directo',
        texto:
          'En todo el texto bíblico solo hay un lugar que prohíbe explícitamente los tatuajes. Está en Levítico, el libro de las leyes que Dios dio al pueblo de Israel.',
        cita: '«No se hagan heridas en el cuerpo por causa de los muertos, ni se hagan tatuajes. Yo soy el Señor.»\n— Levítico 19:28',
      },
      {
        titulo: '¿Por qué esa ley? El contexto lo cambia todo',
        texto:
          'Los pueblos vecinos de Israel (egipcios, cananeos) usaban cortes en la piel y tatuajes como parte de rituales de luto y de adoración a ídolos. Dios le decía a Israel: "No hagan lo que hacen esos pueblos en su religión pagana." La prohibición no era sobre el arte corporal en general, sino sobre imitar prácticas de idolatría.',
      },
      {
        titulo: '¿Esa ley sigue vigente para los cristianos?',
        texto:
          'Levítico 19 también prohíbe mezclar semillas en un mismo campo, cortar el cabello en las sienes y usar ropa de dos telas distintas. Los cristianos no siguen esas leyes ceremoniales porque Jesús vino a cumplir la Ley, no a imponerla como condición de salvación. El Nuevo Testamento enseña que ya no estamos bajo esa tutela.',
        cita: '«Cristo nos redimió de la maldición de la ley.»\n— Gálatas 3:13',
      },
      {
        titulo: 'Lo que sí aplica hoy: tu cuerpo es templo',
        texto:
          'Aunque la ley ceremonial no aplica igual, el Nuevo Testamento sí enseña que el creyente debe honrar a Dios con su cuerpo. Esta es la pregunta relevante hoy: ¿el tatuaje que quiero hacerme glorifica a Dios o lo contradice? ¿Cuál es mi motivo?',
        cita: '«¿O no saben que su cuerpo es templo del Espíritu Santo, que está en ustedes? Por lo tanto, honren a Dios con su cuerpo.»\n— 1 Corintios 6:19-20',
      },
      {
        titulo: '¿Es pecado hacerse un tatuaje?',
        texto:
          'La Biblia no lo condena directamente en el contexto cristiano. La mayoría de teólogos y la Iglesia Católica no prohíben los tatuajes como tal. Lo que sí importa es el contenido (¿qué representa?), el motivo (¿vanidad extrema, presión social, o algo significativo?) y si en tu conciencia lo sientes como algo que honra o deshonra a Dios.',
        cita: '«Todo me es permitido, pero no todo conviene.»\n— 1 Corintios 10:23',
      },
    ],
    conclusion:
      'La Biblia tiene un versículo contra los tatuajes (Lev 19:28), pero estaba dirigido a prácticas de idolatría pagana específicas de esa época. En el Nuevo Testamento no hay prohibición explícita. La pregunta cristiana relevante hoy es: ¿glorifica esto a Dios? El contenido, el motivo y la conciencia son lo que más importa.',
  },
]

export default function PreguntasScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [abierto, setAbierto] = useState<string | null>(null)

  const toggle = (id: string) => setAbierto(prev => (prev === id ? null : id))

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      {/* Header */}
      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.back} activeOpacity={0.7}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>🤔 Preguntas Bíblicas</Text>
        <Text style={s.subtitulo}>Respuestas que la Biblia tiene — aunque no siempre se enseñan</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 24 }}>
        {PREGUNTAS.map(p => {
          const estaAbierto = abierto === p.id
          return (
            <View key={p.id} style={s.card}>
              {/* Pregunta — toca para abrir/cerrar */}
              <TouchableOpacity onPress={() => toggle(p.id)} activeOpacity={0.8} style={s.cardHeader}>
                <Text style={s.emoji}>{p.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.categoria}>{p.categoria}</Text>
                  <Text style={s.preguntaTxt}>{p.pregunta}</Text>
                </View>
                <Text style={[s.chevron, estaAbierto && s.chevronAbierto]}>›</Text>
              </TouchableOpacity>

              {/* Respuesta expandible */}
              {estaAbierto && (
                <View style={s.respuesta}>
                  <View style={s.separador} />

                  {/* Intro */}
                  <Text style={s.introTxt}>{p.intro}</Text>

                  {/* Puntos */}
                  {p.puntos.map((punto, i) => (
                    <View key={i} style={s.punto}>
                      <Text style={s.puntoTitulo}>{i + 1}. {punto.titulo}</Text>
                      <Text style={s.puntoTexto}>{punto.texto}</Text>
                      {punto.cita && (
                        <View style={s.citaBox}>
                          <Text style={s.citaTxt}>{punto.cita}</Text>
                        </View>
                      )}
                    </View>
                  ))}

                  {/* Conclusión */}
                  <View style={s.conclusionBox}>
                    <Text style={s.conclusionLabel}>💡 En resumen</Text>
                    <Text style={s.conclusionTxt}>{p.conclusion}</Text>
                  </View>
                </View>
              )}
            </View>
          )
        })}

        <Text style={s.nota}>Más preguntas próximamente ✝</Text>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.fondo },
  header:         { backgroundColor: C.bg, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16 },
  back:           { marginBottom: 12 },
  backTxt:        { color: C.acento, fontSize: 15 },
  titulo:         { color: C.texto, fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitulo:      { color: '#fde68a', fontSize: 13, lineHeight: 18 },

  card:           { backgroundColor: C.card, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: C.borde, overflow: 'hidden' },
  cardHeader:     { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 12 },
  emoji:          { fontSize: 28, marginTop: 2 },
  categoria:      { color: C.acento, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  preguntaTxt:    { color: C.texto, fontSize: 15, fontWeight: '600', lineHeight: 21 },
  chevron:        { color: C.sub, fontSize: 26, marginLeft: 4, transform: [{ rotate: '0deg' }] },
  chevronAbierto: { transform: [{ rotate: '90deg' }] },

  respuesta:      { paddingHorizontal: 16, paddingBottom: 16 },
  separador:      { height: 1, backgroundColor: C.borde, marginBottom: 14 },
  introTxt:       { color: C.sub, fontSize: 14, lineHeight: 21, marginBottom: 16, fontStyle: 'italic' },

  punto:          { marginBottom: 16 },
  puntoTitulo:    { color: C.acento, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  puntoTexto:     { color: C.texto, fontSize: 14, lineHeight: 22 },
  citaBox:        { backgroundColor: '#1c1917', borderLeftWidth: 3, borderLeftColor: C.acento, borderRadius: 8, padding: 12, marginTop: 8 },
  citaTxt:        { color: '#fde68a', fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  conclusionBox:  { backgroundColor: '#1c1412', borderRadius: 12, padding: 14, marginTop: 4, borderWidth: 1, borderColor: C.bgLight },
  conclusionLabel:{ color: C.acento, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  conclusionTxt:  { color: C.texto, fontSize: 14, lineHeight: 21 },

  nota:           { color: C.sub, fontSize: 13, textAlign: 'center', marginTop: 8, marginBottom: 4 },
})
