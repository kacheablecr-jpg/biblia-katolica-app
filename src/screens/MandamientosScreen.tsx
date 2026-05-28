import React, { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const C = {
  fondo:    '#0f172a',
  card:     '#1e293b',
  texto:    '#f1f5f9',
  sub:      '#94a3b8',
  acento:   '#f59e0b',
  borde:    '#334155',
  bgH:      '#1c1200',
  bgHBorde: '#78350f',
}

interface Mandamiento {
  numero:     number
  titulo:     string
  texto:      string
  pecados:    string[]
  pasaje:     string
  referencia: string
  reflexion:  string
}

const MANDAMIENTOS: Mandamiento[] = [
  {
    numero:     1,
    titulo:     'No tendrás dioses ajenos delante de mí',
    texto:      'No te harás ídolo ni semejanza alguna de lo que está arriba en el cielo, ni abajo en la tierra. No te inclinarás a ellas ni las servirás.',
    pecados: [
      'Idolatría: adorar imágenes, objetos o personas como si tuvieran poder divino',
      'Superstición: amuletos, horóscopo, tarot, cartas o rituales mágicos',
      'Brujería, santería, espiritismo o consultas a "médiums"',
      'New Age y sincretismo: mezclar la fe con prácticas incompatibles',
      'Ateísmo práctico: decir que se cree pero vivir sin ninguna referencia a Dios',
      'Poner el dinero, trabajo, fama o personas en el primer lugar que le pertenece a Dios',
    ],
    pasaje:     '«Nadie puede servir a dos señores; porque odiará al uno y amará al otro. No podéis servir a Dios y a las riquezas.»',
    referencia: '— Mateo 6:24',
    reflexion:  'Todo lo que ponemos en el centro de nuestra vida se convierte en nuestro dios real. La pregunta no es "¿creo en Dios?" sino "¿quién ocupa realmente el primer lugar en mis decisiones diarias?"',
  },
  {
    numero:     2,
    titulo:     'No tomarás el nombre de Dios en vano',
    texto:      'No pronunciarás el nombre del Señor tu Dios en falso; porque el Señor no dará por inocente al que tome su nombre en vano.',
    pecados: [
      'Blasfemia: insultar o despreciar a Dios, a Cristo, a la Virgen o a los santos',
      'Jurar en falso usando el nombre de Dios como respaldo de una mentira',
      'Usar "Dios", "Jesús" o "Cristo" como exclamación vacía o expresión de enojo',
      'Prometer algo a Dios y no cumplirlo',
      'Usar la religión como herramienta para manipular, engañar o aparentar ante otros',
    ],
    pasaje:     '«Sea vuestro hablar: Sí, sí; No, no; porque lo que es más de esto, de mal procede.»',
    referencia: '— Mateo 5:37',
    reflexion:  'El nombre de Dios es sagrado porque Él mismo es sagrado. Tomarlo en vano es tratar como ordinario lo que es extraordinario. Las palabras que usamos revelan lo que realmente llevamos en el corazón.',
  },
  {
    numero:     3,
    titulo:     'Santificarás las fiestas',
    texto:      'Acuérdate del día de reposo para santificarlo. Seis días trabajarás y en ellos harás todas tus obras; mas el séptimo día es reposo para el Señor tu Dios.',
    pecados: [
      'Faltar a la Misa o al culto dominical sin causa grave',
      'Trabajar sin necesidad en el día del Señor tratándolo como un día ordinario',
      'No dar tiempo a Dios, a la familia ni al descanso en el día de reposo',
      'Hacer trabajar a otros innecesariamente en ese día',
      'Llenar el domingo de distracciones que desplazan completamente a Dios',
    ],
    pasaje:     '«El sábado fue hecho por causa del hombre, y no el hombre por causa del sábado.»',
    referencia: '— Marcos 2:27',
    reflexion:  'Dios mismo descansó al séptimo día, no porque estuviera cansado, sino para enseñarnos que la vida no es solo producir. El descanso sagrado es un acto de confianza: creer que Dios sostiene el mundo aunque yo pare.',
  },
  {
    numero:     4,
    titulo:     'Honrarás a tu padre y a tu madre',
    texto:      'Honra a tu padre y a tu madre, para que tus días se alarguen en la tierra que el Señor tu Dios te da.',
    pecados: [
      'Desobedecer a los padres (siendo hijo menor bajo su cuidado)',
      'Maltrato físico, verbal o emocional hacia los padres',
      'Abandono de padres ancianos o enfermos cuando se puede cuidarlos',
      'Hablar mal de los padres o ponerlos en ridículo',
      'Falta de respeto hacia la autoridad legítima: jefes, autoridades civiles, maestros',
      'No proveer para las necesidades de los padres cuando uno tiene los medios',
    ],
    pasaje:     '«Hijos, obedeced en el Señor a vuestros padres, porque esto es justo. Honra a tu padre y a tu madre, que es el primer mandamiento con promesa.»',
    referencia: '— Efesios 6:1-2',
    reflexion:  'Honrar a los padres no exige que sean perfectos. Exige reconocer lo que dieron aunque hayan fallado. Y cuando somos adultos, honrarlos significa estar presentes en su vejez como ellos estuvieron en nuestra infancia.',
  },
  {
    numero:     5,
    titulo:     'No matarás',
    texto:      'No matarás.',
    pecados: [
      'Homicidio: quitar la vida a otro ser humano injustamente',
      'Aborto: interrumpir voluntariamente la vida de un ser humano por nacer',
      'Eutanasia activa: provocar la muerte de enfermos o ancianos',
      'Odio, rencor y deseos de que otros sufran o les vaya mal',
      'Violencia física, verbal o psicológica hacia otras personas',
      'Bullying y acoso que destruye la dignidad de otro',
      'Suicidio: atentar contra la propia vida',
      'Conducir en estado de ebriedad u otras acciones que ponen en riesgo vidas ajenas',
      'Descuido grave y deliberado de la propia salud',
    ],
    pasaje:     '«Oísteis que fue dicho a los antiguos: No matarás; y cualquiera que matare será culpable de juicio. Pero yo os digo que cualquiera que se enoje contra su hermano, será culpable de juicio.»',
    referencia: '— Mateo 5:21-22',
    reflexion:  'Jesús amplió este mandamiento hasta el corazón. No solo prohíbe el acto de matar — prohíbe el odio que lo precede. La vida humana tiene un valor absoluto porque lleva la imagen de Dios impresa desde la concepción.',
  },
  {
    numero:     6,
    titulo:     'No cometerás adulterio',
    texto:      'No cometerás adulterio.',
    pecados: [
      'Adulterio: infidelidad sexual dentro del matrimonio',
      'Fornicación: relaciones sexuales fuera del matrimonio',
      'Pornografía: consumir o producir material que cosifica la sexualidad',
      'Pensamientos lujuriosos deliberados sobre personas reales',
      'Infidelidad emocional: intimidad afectiva que le pertenece a la pareja dada a otra persona',
      'Unión libre: convivencia sexual sin el compromiso formal del matrimonio',
      'Acoso sexual y abuso',
      'Promiscuidad: multiplicidad de relaciones sexuales sin compromiso',
    ],
    pasaje:     '«Oísteis que fue dicho: No cometerás adulterio. Pero yo os digo que cualquiera que mira a una mujer para codiciarla, ya adulteró con ella en su corazón.»',
    referencia: '— Mateo 5:27-28',
    reflexion:  'Dios no puso límites a la sexualidad para quitarte algo — los puso porque la intimidad sexual es el lenguaje del amor más total. Cuando se saca de ese contexto, se convierte en algo más pequeño de lo que fue diseñado para ser.',
  },
  {
    numero:     7,
    titulo:     'No robarás',
    texto:      'No robarás.',
    pecados: [
      'Hurto y robo en cualquiera de sus formas',
      'Fraude, estafa y engaño en transacciones comerciales',
      'Evasión de impuestos',
      'No pagar deudas teniendo los medios para hacerlo',
      'Retener el salario justo a los trabajadores o pagar mal a sabiendas',
      'Corrupción: abusar de un cargo para beneficio propio',
      'Plagio: apropiarse del trabajo intelectual ajeno',
      'Trabajar sin honestidad sabiendo que le están pagando por eso',
      'Daño intencional a la propiedad ajena',
    ],
    pasaje:     '«El que robaba, no robe más, sino trabaje, haciendo con sus manos lo que es bueno, para que tenga qué compartir con el que padece necesidad.»',
    referencia: '— Efesios 4:28',
    reflexion:  'Robar no es solo tomar lo ajeno con las manos. Es cualquier forma de apropiarse de lo que no te pertenece: tiempo, crédito, dinero, oportunidades. La honestidad es la base de cualquier comunidad que quiera funcionar.',
  },
  {
    numero:     8,
    titulo:     'No darás falso testimonio ni mentirás',
    texto:      'No hablarás contra tu prójimo falso testimonio.',
    pecados: [
      'Mentira: decir lo contrario de lo que se sabe que es verdad',
      'Calumnia: inventar o atribuir falsamente cosas malas sobre otro',
      'Difamación: revelar verdades innecesariamente para dañar la reputación de alguien',
      'Chisme: transmitir información privada de otros sin su consentimiento',
      'Hipocresía: aparentar virtud que no se tiene',
      'Adulación interesada: decir lo que otro quiere oír por conveniencia propia',
      'Silencio cómplice: callar cuando se debería hablar para defender la justicia',
      'Desinformación en redes sociales: compartir noticias falsas sin verificar',
    ],
    pasaje:     '«Los labios mentirosos son abominación al Señor; pero los que hacen verdad son su contentamiento.»',
    referencia: '— Proverbios 12:22',
    reflexion:  'La mentira destruye la confianza, y sin confianza no hay comunidad posible. Jesús se llamó a sí mismo "la Verdad". Vivir en la verdad no es solo no mentir — es construir una vida que no necesite mentira para sostenerse.',
  },
  {
    numero:     9,
    titulo:     'No desearás la mujer de tu prójimo',
    texto:      'No codiciarás la mujer de tu prójimo.',
    pecados: [
      'Lujuria: alimentar deliberadamente deseos sexuales hacia personas con pareja',
      'Fantasías sexuales voluntarias con personas comprometidas o casadas',
      'Coqueteo intencional para seducir a quien tiene una relación',
      'Consumo de entretenimiento diseñado explícitamente para despertar deseos impuros',
      'Cultura de la infidelidad: normalizar "mirar" o "fantasear" como algo inofensivo',
      'Buscar cercanía emocional con alguien casado que debilite su matrimonio',
    ],
    pasaje:     '«Hice pacto con mis ojos; ¿cómo, pues, había yo de mirar a una virgen?»',
    referencia: '— Job 31:1',
    reflexion:  'Este mandamiento protege algo que va más allá de los actos: protege el corazón. Lo que cultivamos en la mente y en los ojos tarde o temprano se convierte en acción. Job tomó la decisión de proteger su corazón antes de que la situación lo pusiera a prueba.',
  },
  {
    numero:     10,
    titulo:     'No codiciarás los bienes ajenos',
    texto:      'No codiciarás la casa de tu prójimo, ni su siervo, ni su sierva, ni su buey, ni su asno, ni cosa alguna de tu prójimo.',
    pecados: [
      'Envidia: tristeza o resentimiento ante el bien o el éxito ajeno',
      'Codicia: deseo desmedido de acumular más allá de lo que se necesita',
      'Ambición que pasa por encima de los demás para lograr sus metas',
      'Resentimiento constante por lo que otros tienen y uno no',
      'Desear que otros pierdan lo que tienen para sentirse igual',
      'Comparación destructiva: medir el propio valor por lo que otros poseen',
      'Avaricia: retener lo que se tiene sin compartir, aunque sobre',
    ],
    pasaje:     '«Mirad, y guardaos de toda avaricia; porque la vida del hombre no consiste en la abundancia de los bienes que posee.»',
    referencia: '— Lucas 12:15',
    reflexion:  'La codicia es el pecado más silencioso: no se ve desde afuera. Ocurre enteramente en el corazón. Por eso Dios cierra los Diez Mandamientos con este: porque todo lo demás puede desbordarse hacia afuera, pero la raíz siempre está adentro.',
  },
]

export default function MandamientosScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [abierto, setAbierto] = useState<number | null>(null)

  const toggle = (n: number) =>
    setAbierto(prev => (prev === n ? null : n))

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.back} activeOpacity={0.7}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>📜 Los 10 Mandamientos</Text>
        <Text style={s.subtitulo}>El mandamiento, los pecados que incluye y un pasaje bíblico</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 24 }}>
        {MANDAMIENTOS.map(m => {
          const estaAbierto = abierto === m.numero
          return (
            <View key={m.numero} style={s.card}>
              <TouchableOpacity
                onPress={() => toggle(m.numero)}
                style={s.cardHeader}
                activeOpacity={0.8}
              >
                <View style={s.numCircle}>
                  <Text style={s.numTxt}>{m.numero}</Text>
                </View>
                <Text style={s.mandTitulo}>{m.titulo}</Text>
                <Text style={[s.chevron, estaAbierto && s.chevronAbierto]}>›</Text>
              </TouchableOpacity>

              {estaAbierto && (
                <View style={s.cuerpo}>
                  <View style={s.separador} />

                  {/* Texto del mandamiento */}
                  <View style={s.textoBox}>
                    <Text style={s.textoMand}>«{m.texto}»</Text>
                  </View>

                  {/* Pecados derivados */}
                  <Text style={s.secLabel}>⚠️  Pecados que incluye este mandamiento</Text>
                  {m.pecados.map((p, i) => (
                    <View key={i} style={s.pecadoRow}>
                      <Text style={s.pecadoBullet}>•</Text>
                      <Text style={s.pecadoTxt}>{p}</Text>
                    </View>
                  ))}

                  {/* Pasaje bíblico */}
                  <View style={s.pasajeBox}>
                    <Text style={s.pasajeTxt}>{m.pasaje}</Text>
                    <Text style={s.pasajeRef}>{m.referencia}</Text>
                  </View>

                  {/* Reflexión */}
                  <View style={s.reflexionBox}>
                    <Text style={s.reflexionLabel}>💡 Para reflexionar</Text>
                    <Text style={s.reflexionTxt}>{m.reflexion}</Text>
                  </View>
                </View>
              )}
            </View>
          )
        })}

        <Text style={s.nota}>
          Basado en el Catecismo de la Iglesia Católica y la Biblia DHH ✝
        </Text>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container:      { flex: 1, backgroundColor: C.fondo },
  header:         { backgroundColor: C.bgH, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16, borderBottomWidth: 1, borderColor: C.bgHBorde },
  back:           { marginBottom: 12 },
  backTxt:        { color: C.acento, fontSize: 15 },
  titulo:         { color: C.texto, fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitulo:      { color: '#fde68a', fontSize: 13, lineHeight: 18 },

  card:           { backgroundColor: C.card, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: C.borde, overflow: 'hidden' },
  cardHeader:     { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  numCircle:      { width: 36, height: 36, borderRadius: 18, backgroundColor: C.bgH, borderWidth: 1, borderColor: C.acento, alignItems: 'center', justifyContent: 'center' },
  numTxt:         { color: C.acento, fontSize: 15, fontWeight: '700' },
  mandTitulo:     { color: C.texto, fontSize: 14, fontWeight: '600', lineHeight: 20, flex: 1 },
  chevron:        { color: C.sub, fontSize: 26, marginLeft: 4 },
  chevronAbierto: { transform: [{ rotate: '90deg' }] },

  cuerpo:         { paddingHorizontal: 16, paddingBottom: 16 },
  separador:      { height: 1, backgroundColor: C.borde, marginBottom: 14 },

  textoBox:       { backgroundColor: '#1a1200', borderRadius: 10, padding: 14, marginBottom: 14, borderLeftWidth: 3, borderLeftColor: C.acento },
  textoMand:      { color: '#fde68a', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },

  secLabel:       { color: C.acento, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  pecadoRow:      { flexDirection: 'row', gap: 8, marginBottom: 7, alignItems: 'flex-start' },
  pecadoBullet:   { color: '#f87171', fontSize: 18, lineHeight: 22, marginTop: -2 },
  pecadoTxt:      { color: C.texto, fontSize: 13, lineHeight: 20, flex: 1 },

  pasajeBox:      { backgroundColor: '#1c1917', borderRadius: 10, padding: 14, marginTop: 14, borderLeftWidth: 3, borderLeftColor: '#78350f' },
  pasajeTxt:      { color: '#fef3c7', fontSize: 13, lineHeight: 21, fontStyle: 'italic', marginBottom: 6 },
  pasajeRef:      { color: C.acento, fontSize: 12, textAlign: 'right', fontWeight: '600' },

  reflexionBox:   { backgroundColor: '#0d1a2e', borderRadius: 10, padding: 14, marginTop: 10, borderWidth: 1, borderColor: '#1e3a5f' },
  reflexionLabel: { color: '#93c5fd', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  reflexionTxt:   { color: '#dbeafe', fontSize: 14, lineHeight: 21 },

  nota:           { color: C.sub, fontSize: 12, textAlign: 'center', marginTop: 8, marginBottom: 4 },
})
