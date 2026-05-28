import React from 'react'
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, StatusBar, Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ruta } from './RutasScreen'

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#818cf8', borde: '#334155' }
const { width } = Dimensions.get('window')
const CARD_W = (width - 16 * 3) / 2

const EMOCIONES: Ruta[] = [
  {
    id: 'ansiedad',
    titulo: 'Ansiedad y pánico',
    descripcion: 'Cuando el miedo y la angustia te paralizan',
    emoji: '😰',
    color: '#6366f1',
    pasajes: [
      { libroId: 59, libroNombre: 'Filipenses',   capitulo: 4,  versiculoInicio: 4,  versiculoFin: 7,  descripcion: '"No se angustien por nada... la paz de Dios cuidará sus corazones"' },
      { libroId: 19, libroNombre: 'Salmos',        capitulo: 34, versiculoInicio: 4,  versiculoFin: 8,  descripcion: '"Busqué al Señor y me libró de todos mis temores"' },
      { libroId: 19, libroNombre: 'Salmos',        capitulo: 46, versiculoInicio: 1,  versiculoFin: 3,  descripcion: '"Dios es nuestro refugio y fortaleza, socorro muy presente en las tribulaciones"' },
      { libroId: 23, libroNombre: 'Isaías',        capitulo: 26, versiculoInicio: 3,  versiculoFin: 4,  descripcion: '"Al de firme propósito lo guardarás en perfecta paz, porque en ti confía"' },
      { libroId: 69, libroNombre: '1 Pedro',       capitulo: 5,  versiculoInicio: 7,  versiculoFin: 7,  descripcion: '"Depositen en él toda su angustia, porque él cuida de ustedes"' },
    ],
  },
  {
    id: 'tristeza',
    titulo: 'Tristeza y depresión',
    descripcion: 'Cuando el peso del corazón se hace difícil de cargar',
    emoji: '😢',
    color: '#3b82f6',
    pasajes: [
      { libroId: 49, libroNombre: 'San Mateo',     capitulo: 11, versiculoInicio: 28, versiculoFin: 30, descripcion: '"Vengan a mí todos los que están cansados y agobiados, y yo los aliviaré"' },
      { libroId: 19, libroNombre: 'Salmos',         capitulo: 42, versiculoInicio: 5,  versiculoFin: 8,  descripcion: '"¿Por qué estás abatida, alma mía? Espera en Dios"' },
      { libroId: 23, libroNombre: 'Isaías',         capitulo: 43, versiculoInicio: 1,  versiculoFin: 4,  descripcion: '"No temas, te he redimido, te he llamado por tu nombre, eres mío"' },
      { libroId: 25, libroNombre: 'Lamentaciones',  capitulo: 3,  versiculoInicio: 22, versiculoFin: 26, descripcion: '"Las misericordias del Señor son nuevas cada mañana"' },
      { libroId: 54, libroNombre: 'Romanos',        capitulo: 8,  versiculoInicio: 38, versiculoFin: 39, descripcion: '"Nada nos podrá separar del amor que Dios nos ha mostrado"' },
    ],
  },
  {
    id: 'soledad',
    titulo: 'Soledad',
    descripcion: 'Cuando sientes que nadie te ve ni te comprende',
    emoji: '😔',
    color: '#8b5cf6',
    pasajes: [
      { libroId: 19, libroNombre: 'Salmos',    capitulo: 139, versiculoInicio: 1,  versiculoFin: 10, descripcion: '"Señor, tú me examinas y me conoces... ni la oscuridad es oscura para ti"' },
      { libroId: 23, libroNombre: 'Isaías',    capitulo: 49,  versiculoInicio: 14, versiculoFin: 16, descripcion: '"¿Puede una madre olvidar a su hijo?... Yo no te olvidaré; grabada te llevo en mis manos"' },
      { libroId: 49, libroNombre: 'San Mateo', capitulo: 28,  versiculoInicio: 19, versiculoFin: 20, descripcion: '"Yo estaré con ustedes todos los días, hasta el fin del mundo"' },
      { libroId: 52, libroNombre: 'San Juan',  capitulo: 14,  versiculoInicio: 18, versiculoFin: 18, descripcion: '"No los dejaré huérfanos; volveré a ustedes"' },
      { libroId: 67, libroNombre: 'Hebreos',   capitulo: 13,  versiculoInicio: 5,  versiculoFin: 6,  descripcion: '"Nunca te dejaré ni te abandonaré"' },
    ],
  },
  {
    id: 'culpa',
    titulo: 'Culpa y arrepentimiento',
    descripcion: 'Cuando el peso de los errores te agobia',
    emoji: '😞',
    color: '#ef4444',
    pasajes: [
      { libroId: 19, libroNombre: 'Salmos',         capitulo: 51, versiculoInicio: 1,  versiculoFin: 12, descripcion: 'El Miserere — oración de perdón de David al Señor' },
      { libroId: 51, libroNombre: 'San Lucas',       capitulo: 15, versiculoInicio: 11, versiculoFin: 24, descripcion: 'El hijo pródigo — el Padre corre a recibir al que regresa' },
      { libroId: 71, libroNombre: '1 Juan',         capitulo: 1,  versiculoInicio: 9,  versiculoFin: 9,  descripcion: '"Si confesamos nuestros pecados, él es fiel y nos perdonará"' },
      { libroId: 54, libroNombre: 'Romanos',         capitulo: 8,  versiculoInicio: 1,  versiculoFin: 2,  descripcion: '"No hay ninguna condenación para los que están en Cristo Jesús"' },
      { libroId: 33, libroNombre: 'Miqueas',         capitulo: 7,  versiculoInicio: 18, versiculoFin: 19, descripcion: '"¿Qué Dios hay como tú, que perdona la maldad y olvida el pecado?"' },
    ],
  },
  {
    id: 'sin_esperanza',
    titulo: 'Sin esperanza',
    descripcion: 'Cuando el futuro parece oscuro y sin salida',
    emoji: '🌑',
    color: '#64748b',
    pasajes: [
      { libroId: 24, libroNombre: 'Jeremías',     capitulo: 29,  versiculoInicio: 11, versiculoFin: 13, descripcion: '"Sé los planes que tengo para ustedes — planes de bienestar, no de calamidad"' },
      { libroId: 25, libroNombre: 'Lamentaciones', capitulo: 3,  versiculoInicio: 21, versiculoFin: 26, descripcion: '"Esto traigo a mi memoria y por eso tengo esperanza"' },
      { libroId: 19, libroNombre: 'Salmos',        capitulo: 130, versiculoInicio: 1,  versiculoFin: 7,  descripcion: '"Del profundo pozo clamo a ti, Señor... espera en el Señor, porque en él hay misericordia"' },
      { libroId: 54, libroNombre: 'Romanos',       capitulo: 5,  versiculoInicio: 3,  versiculoFin: 5,  descripcion: '"La esperanza no avergüenza, porque el amor de Dios ha sido derramado en nuestros corazones"' },
      { libroId: 54, libroNombre: 'Romanos',       capitulo: 15, versiculoInicio: 13, versiculoFin: 13, descripcion: '"Que el Dios de la esperanza los llene de toda alegría y paz"' },
    ],
  },
  {
    id: 'gratitud',
    titulo: 'Gratitud',
    descripcion: 'Para dar gracias a Dios por todo lo recibido',
    emoji: '🙏',
    color: '#f59e0b',
    pasajes: [
      { libroId: 19, libroNombre: 'Salmos',           capitulo: 100, versiculoInicio: 1,  versiculoFin: 5,  descripcion: '"Aclamen al Señor, pueblos todos. Denle gracias y bendigan su nombre"' },
      { libroId: 19, libroNombre: 'Salmos',           capitulo: 103, versiculoInicio: 1,  versiculoFin: 5,  descripcion: '"Alaba, alma mía, al Señor... que perdona todas tus iniquidades"' },
      { libroId: 19, libroNombre: 'Salmos',           capitulo: 136, versiculoInicio: 1,  versiculoFin: 9,  descripcion: '"Den gracias al Señor porque es bueno; su amor es eterno"' },
      { libroId: 61, libroNombre: '1 Tesalonicenses', capitulo: 5,   versiculoInicio: 16, versiculoFin: 18, descripcion: '"Den gracias a Dios en todo, porque esta es su voluntad"' },
      { libroId: 51, libroNombre: 'San Lucas',         capitulo: 17,  versiculoInicio: 11, versiculoFin: 19, descripcion: 'Los diez leprosos — el que regresa a dar gracias a Jesús' },
    ],
  },
  {
    id: 'ira',
    titulo: 'Ira y resentimiento',
    descripcion: 'Cuando la rabia o el rencor te consumen por dentro',
    emoji: '😤',
    color: '#dc2626',
    pasajes: [
      { libroId: 58, libroNombre: 'Efesios',      capitulo: 4,  versiculoInicio: 26, versiculoFin: 27, descripcion: '"No dejen que el sol se ponga estando aún enojados"' },
      { libroId: 54, libroNombre: 'Romanos',      capitulo: 12, versiculoInicio: 17, versiculoFin: 21, descripcion: '"No busquen venganza... Vence el mal con el bien"' },
      { libroId: 20, libroNombre: 'Proverbios',   capitulo: 15, versiculoInicio: 1,  versiculoFin: 1,  descripcion: '"La respuesta suave calma el enojo, pero la respuesta dura lo enciende"' },
      { libroId: 20, libroNombre: 'Proverbios',   capitulo: 29, versiculoInicio: 11, versiculoFin: 11, descripcion: '"El necio da rienda suelta a su enojo, pero el sabio lo controla"' },
      { libroId: 68, libroNombre: 'Santiago',     capitulo: 1,  versiculoInicio: 19, versiculoFin: 20, descripcion: '"Que todos sean lentos para hablar, lentos para enojarse"' },
      { libroId: 1,  libroNombre: 'Génesis',      capitulo: 4,  versiculoInicio: 6,  versiculoFin: 7,  descripcion: '"¿Por qué te has airado? Si bien haces, ¿no serás enaltecido? El pecado está a la puerta"' },
      { libroId: 19, libroNombre: 'Salmos',       capitulo: 37, versiculoInicio: 8,  versiculoFin: 9,  descripcion: '"Deja la ira y abandona el furor; no te irrites de ningún modo, porque eso lleva al mal"' },
    ],
  },
  {
    id: 'enfermedad',
    titulo: 'Enfermedad y sufrimiento',
    descripcion: 'Cuando el cuerpo o el alma sufren',
    emoji: '🤕',
    color: '#0891b2',
    pasajes: [
      { libroId: 19, libroNombre: 'Salmos',      capitulo: 23, versiculoInicio: 1,  versiculoFin: 6,  descripcion: '"Aunque camine por el valle de sombra de muerte, no temeré ningún mal"' },
      { libroId: 56, libroNombre: '2 Corintios', capitulo: 12, versiculoInicio: 7,  versiculoFin: 10, descripcion: '"Cuando soy débil, entonces soy fuerte — el poder de Dios en mi debilidad"' },
      { libroId: 54, libroNombre: 'Romanos',     capitulo: 8,  versiculoInicio: 18, versiculoFin: 18, descripcion: '"Los sufrimientos del presente no se comparan con la gloria futura"' },
      { libroId: 23, libroNombre: 'Isaías',      capitulo: 53, versiculoInicio: 4,  versiculoFin: 6,  descripcion: '"Él cargó con nuestras enfermedades y soportó nuestros dolores"' },
      { libroId: 68, libroNombre: 'Santiago',    capitulo: 5,  versiculoInicio: 13, versiculoFin: 16, descripcion: 'La unción de los enfermos — oración de fe y sanación' },
    ],
  },
  {
    id: 'duelo',
    titulo: 'Duelo y pérdida',
    descripcion: 'Cuando has perdido a alguien que amabas',
    emoji: '💔',
    color: '#475569',
    pasajes: [
      { libroId: 52, libroNombre: 'San Juan',         capitulo: 11, versiculoInicio: 32, versiculoFin: 36, descripcion: '"Jesús lloró" — Dios llora con los que lloran' },
      { libroId: 61, libroNombre: '1 Tesalonicenses', capitulo: 4,  versiculoInicio: 13, versiculoFin: 18, descripcion: '"No se entristezcan como los que no tienen esperanza"' },
      { libroId: 75, libroNombre: 'Apocalipsis',      capitulo: 21, versiculoInicio: 1,  versiculoFin: 5,  descripcion: '"Enjugará toda lágrima... ya no habrá más muerte ni llanto"' },
      { libroId: 55, libroNombre: '1 Corintios',      capitulo: 15, versiculoInicio: 51, versiculoFin: 57, descripcion: '"¿Dónde está, oh muerte, tu victoria?... Gracias a Dios que nos da la victoria por medio de Jesucristo"' },
    ],
  },
  {
    id: 'decisiones',
    titulo: 'Decisiones difíciles',
    descripcion: 'Cuando no sabes qué camino tomar',
    emoji: '🤔',
    color: '#7c3aed',
    pasajes: [
      { libroId: 20, libroNombre: 'Proverbios', capitulo: 3,  versiculoInicio: 5,  versiculoFin: 6,  descripcion: '"Confía en el Señor de todo corazón, y no en tu propia inteligencia"' },
      { libroId: 68, libroNombre: 'Santiago',   capitulo: 1,  versiculoInicio: 5,  versiculoFin: 8,  descripcion: '"Si a alguno le falta sabiduría, pídala a Dios y él se la dará"' },
      { libroId: 19, libroNombre: 'Salmos',     capitulo: 32, versiculoInicio: 8,  versiculoFin: 8,  descripcion: '"Te instruiré y te mostraré el camino que debes seguir"' },
      { libroId: 52, libroNombre: 'San Juan',   capitulo: 14, versiculoInicio: 6,  versiculoFin: 6,  descripcion: '"Yo soy el camino, la verdad y la vida"' },
      { libroId: 54, libroNombre: 'Romanos',    capitulo: 12, versiculoInicio: 2,  versiculoFin: 2,  descripcion: '"Disciernan cuál es la buena, agradable y perfecta voluntad de Dios"' },
    ],
  },
  {
    id: 'miedo',
    titulo: 'Miedo',
    descripcion: 'Cuando el temor paraliza tu vida',
    emoji: '😨',
    color: '#0f766e',
    pasajes: [
      { libroId: 23, libroNombre: 'Isaías',    capitulo: 41, versiculoInicio: 10, versiculoFin: 13, descripcion: '"No temas, porque yo estoy contigo. No te angusties, porque yo soy tu Dios"' },
      { libroId: 19, libroNombre: 'Salmos',    capitulo: 27, versiculoInicio: 1,  versiculoFin: 3,  descripcion: '"El Señor es mi luz y mi salvación, ¿a quién temeré?"' },
      { libroId: 19, libroNombre: 'Salmos',    capitulo: 91, versiculoInicio: 1,  versiculoFin: 7,  descripcion: '"El que habita al abrigo del Altísimo... no temerás el terror nocturno ni la flecha que vuela de día"' },
      { libroId: 64, libroNombre: '2 Timoteo', capitulo: 1,  versiculoInicio: 7,  versiculoFin: 7,  descripcion: '"Dios no nos ha dado un espíritu de cobardía, sino de poder, amor y dominio propio"' },
      { libroId: 71, libroNombre: '1 Juan',    capitulo: 4,  versiculoInicio: 18, versiculoFin: 19, descripcion: '"El amor perfecto echa fuera el temor"' },
    ],
  },
  {
    id: 'tentacion',
    titulo: 'Tentación',
    descripcion: 'Cuando sientes que no puedes resistir',
    emoji: '⚡',
    color: '#b45309',
    pasajes: [
      { libroId: 49, libroNombre: 'San Mateo',   capitulo: 4,  versiculoInicio: 1,  versiculoFin: 11, descripcion: 'Jesús vence las tres tentaciones en el desierto' },
      { libroId: 55, libroNombre: '1 Corintios', capitulo: 10, versiculoInicio: 12, versiculoFin: 13, descripcion: '"Dios no permitirá que sean tentados más allá de lo que pueden soportar"' },
      { libroId: 68, libroNombre: 'Santiago',    capitulo: 1,  versiculoInicio: 12, versiculoFin: 15, descripcion: '"Bienaventurado el que soporta la tentación"' },
      { libroId: 58, libroNombre: 'Efesios',     capitulo: 6,  versiculoInicio: 10, versiculoFin: 18, descripcion: 'La armadura de Dios — cómo resistir al enemigo' },
      { libroId: 51, libroNombre: 'San Lucas',    capitulo: 22, versiculoInicio: 39, versiculoFin: 46, descripcion: '"Oren para no caer en tentación"' },
    ],
  },
  {
    id: 'economia',
    titulo: 'Problemas económicos',
    descripcion: 'Cuando las deudas y la escasez te agobian',
    emoji: '💰',
    color: '#15803d',
    pasajes: [
      { libroId: 49, libroNombre: 'San Mateo',  capitulo: 6,  versiculoInicio: 25, versiculoFin: 34, descripcion: '"No se preocupen diciendo \'¿qué comeremos?\' El Padre sabe que los necesitan"' },
      { libroId: 59, libroNombre: 'Filipenses', capitulo: 4,  versiculoInicio: 19, versiculoFin: 19, descripcion: '"Mi Dios suplirá todo lo que les falte conforme a sus riquezas en gloria"' },
      { libroId: 51, libroNombre: 'San Lucas',   capitulo: 12, versiculoInicio: 13, versiculoFin: 21, descripcion: 'La parábola del rico necio — lo que importa de verdad' },
      { libroId: 39, libroNombre: 'Malaquías',  capitulo: 3,  versiculoInicio: 10, versiculoFin: 12, descripcion: '"Pruébenme en esto — abriré las ventanas del cielo y derramaré bendición"' },
      { libroId: 63, libroNombre: '1 Timoteo',  capitulo: 6,  versiculoInicio: 6,  versiculoFin: 10, descripcion: '"La piedad con contentamiento es una gran ganancia"' },
    ],
  },
  {
    id: 'familia',
    titulo: 'Problemas familiares',
    descripcion: 'Cuando los conflictos en casa duelen',
    emoji: '🏠',
    color: '#9333ea',
    pasajes: [
      { libroId: 60, libroNombre: 'Colosenses',  capitulo: 3,  versiculoInicio: 12, versiculoFin: 17, descripcion: '"Vístanse de amor, que es el vínculo perfecto... perdónense mutuamente"' },
      { libroId: 58, libroNombre: 'Efesios',     capitulo: 5,  versiculoInicio: 22, versiculoFin: 33, descripcion: 'La familia cristiana — amor, respeto y unidad' },
      { libroId: 6,  libroNombre: 'Josué',       capitulo: 24, versiculoInicio: 14, versiculoFin: 15, descripcion: '"Yo y mi casa serviremos al Señor" — la decisión familiar más importante' },
      { libroId: 55, libroNombre: '1 Corintios', capitulo: 13, versiculoInicio: 1,  versiculoFin: 13, descripcion: '"El amor es paciente, es bondadoso... no guarda rencor"' },
      { libroId: 20, libroNombre: 'Proverbios',  capitulo: 17, versiculoInicio: 1,  versiculoFin: 1,  descripcion: '"Más vale un bocado seco con tranquilidad que una casa llena de banquetes con peleas"' },
    ],
  },
  {
    id: 'perdonar',
    titulo: 'Necesito perdonar',
    descripcion: 'Cuando el rencor es más difícil de soltar que de cargar',
    emoji: '🤝',
    color: '#0369a1',
    pasajes: [
      { libroId: 49, libroNombre: 'San Mateo', capitulo: 18, versiculoInicio: 21, versiculoFin: 35, descripcion: '"¿Cuántas veces debo perdonar? Hasta setenta veces siete"' },
      { libroId: 51, libroNombre: 'San Lucas',  capitulo: 23, versiculoInicio: 33, versiculoFin: 34, descripcion: '"Padre, perdónalos, porque no saben lo que hacen" — Jesús en la Cruz' },
      { libroId: 58, libroNombre: 'Efesios',   capitulo: 4,  versiculoInicio: 31, versiculoFin: 32, descripcion: '"Perdónense mutuamente, así como Dios los perdonó en Cristo"' },
      { libroId: 50, libroNombre: 'San Marcos', capitulo: 11, versiculoInicio: 24, versiculoFin: 25, descripcion: '"Cuando oren, si tienen algo contra alguien, perdónenle"' },
      { libroId: 60, libroNombre: 'Colosenses', capitulo: 3,  versiculoInicio: 12, versiculoFin: 13, descripcion: '"Sopórtense mutuamente y perdónense si alguno tiene queja"' },
    ],
  },
  {
    id: 'orgullo',
    titulo: 'Orgullo y humildad',
    descripcion: 'Cuando el ego nos aleja de Dios y de los demás',
    emoji: '🙇',
    color: '#c2410c',
    pasajes: [
      { libroId: 59, libroNombre: 'Filipenses', capitulo: 2,  versiculoInicio: 5,  versiculoFin: 11, descripcion: '"Jesús se humilló... tomando la condición de siervo" — el himno de la kenosis' },
      { libroId: 20, libroNombre: 'Proverbios', capitulo: 16, versiculoInicio: 18, versiculoFin: 19, descripcion: '"El orgullo precede a la caída, y la arrogancia precede al fracaso"' },
      { libroId: 49, libroNombre: 'San Mateo',  capitulo: 23, versiculoInicio: 11, versiculoFin: 12, descripcion: '"El que se ensalce será humillado, y el que se humille será ensalzado"' },
      { libroId: 68, libroNombre: 'Santiago',   capitulo: 4,  versiculoInicio: 10, versiculoFin: 10, descripcion: '"Humíllense delante del Señor y él los exaltará"' },
      { libroId: 51, libroNombre: 'San Lucas',   capitulo: 18, versiculoInicio: 9,  versiculoFin: 14, descripcion: 'El fariseo y el publicano — la oración del humilde' },
    ],
  },
  {
    id: 'fe',
    titulo: 'Dudas en la fe',
    descripcion: 'Cuando preguntas "¿Dónde estás, Dios?"',
    emoji: '🔍',
    color: '#0891b2',
    pasajes: [
      { libroId: 50, libroNombre: 'San Marcos', capitulo: 9,  versiculoInicio: 21, versiculoFin: 27, descripcion: '"¡Sí creo! Ayúdame a creer más" — la oración más honesta de la Biblia' },
      { libroId: 52, libroNombre: 'San Juan',   capitulo: 20, versiculoInicio: 24, versiculoFin: 29, descripcion: 'La duda de Tomás — "Señor mío y Dios mío"' },
      { libroId: 67, libroNombre: 'Hebreos',    capitulo: 11, versiculoInicio: 1,  versiculoFin: 12, descripcion: 'La nube de testigos — los héroes de la fe' },
      { libroId: 19, libroNombre: 'Salmos',     capitulo: 22, versiculoInicio: 1,  versiculoFin: 5,  descripcion: '"Dios mío, ¿por qué me has abandonado?" — el clamor honesto' },
      { libroId: 35, libroNombre: 'Habacuc',    capitulo: 1,  versiculoInicio: 1,  versiculoFin: 5,  descripcion: 'El profeta le hace preguntas difíciles a Dios — y Dios responde' },
      { libroId: 11, libroNombre: '1 Reyes',    capitulo: 19, versiculoInicio: 1,  versiculoFin: 13, descripcion: 'Elías en el desierto: Dios no estaba en el viento ni en el terremoto, sino en una voz suave y delicada' },
    ],
  },
  {
    id: 'fortaleza',
    titulo: 'Necesito fortaleza',
    descripcion: 'Cuando ya no tienes fuerzas para seguir',
    emoji: '💪',
    color: '#16a34a',
    pasajes: [
      { libroId: 23, libroNombre: 'Isaías',      capitulo: 40, versiculoInicio: 29, versiculoFin: 31, descripcion: '"Los que confían en el Señor renovarán sus fuerzas, volarán como águilas"' },
      { libroId: 59, libroNombre: 'Filipenses',  capitulo: 4,  versiculoInicio: 11, versiculoFin: 13, descripcion: '"Todo lo puedo en Cristo que me fortalece"' },
      { libroId: 6,  libroNombre: 'Josué',       capitulo: 1,  versiculoInicio: 6,  versiculoFin: 9,  descripcion: '"Sé fuerte y valiente. No temas, el Señor tu Dios estará contigo"' },
      { libroId: 19, libroNombre: 'Salmos',      capitulo: 18, versiculoInicio: 1,  versiculoFin: 3,  descripcion: '"Te amo, oh Señor, fortaleza mía. El Señor es mi roca, mi amparo y mi libertador"' },
      { libroId: 58, libroNombre: 'Efesios',     capitulo: 3,  versiculoInicio: 14, versiculoFin: 21, descripcion: '"Pido que los fortalezca con poder por su Espíritu en el hombre interior"' },
    ],
  },
  {
    id: 'emociones',
    titulo: 'Gestionar las emociones',
    descripcion: 'Cuando no sabes qué hacer con lo que sientes',
    emoji: '🧠',
    color: '#0d9488',
    pasajes: [
      { libroId: 52, libroNombre: 'San Juan',    capitulo: 11, versiculoInicio: 33, versiculoFin: 36, descripcion: '"Jesús lloró" — Dios mismo sintió dolor y lo expresó. Las emociones no son pecado' },
      { libroId: 58, libroNombre: 'Efesios',     capitulo: 4,  versiculoInicio: 26, versiculoFin: 27, descripcion: '"Si se enojan, no pequéis. No dejen que el sol se ponga estando aún enojados"' },
      { libroId: 59, libroNombre: 'Filipenses',  capitulo: 4,  versiculoInicio: 6,  versiculoFin: 7,  descripcion: '"En todo... presenten sus peticiones a Dios. Y la paz de Dios cuidará sus corazones"' },
      { libroId: 20, libroNombre: 'Proverbios',  capitulo: 4,  versiculoInicio: 23, versiculoFin: 23, descripcion: '"Por encima de todo lo que guardes, cuida tu corazón, porque de él mana la vida"' },
      { libroId: 19, libroNombre: 'Salmos',      capitulo: 62, versiculoInicio: 8,  versiculoFin: 8,  descripcion: '"Confía en él en todo tiempo... derrama tu corazón delante de él"' },
    ],
  },
  {
    id: 'ira_ninos',
    titulo: 'Ira hacia un niño',
    descripcion: 'Cuando la frustración se convierte en algo que lastima',
    emoji: '🛡️',
    color: '#b91c1c',
    pasajes: [
      { libroId: 50, libroNombre: 'San Marcos',  capitulo: 9,  versiculoInicio: 42, versiculoFin: 42, descripcion: '"El que haga pecar a uno de estos pequeños... mejor le sería que le atasen una piedra de molino al cuello"' },
      { libroId: 49, libroNombre: 'San Mateo',   capitulo: 18, versiculoInicio: 1,  versiculoFin: 5,  descripcion: '"El que reciba a un niño en mi nombre, a mí me recibe" — los niños como imagen de Dios' },
      { libroId: 58, libroNombre: 'Efesios',     capitulo: 6,  versiculoInicio: 4,  versiculoFin: 4,  descripcion: '"Padres, no provoquéis a ira a vuestros hijos, sino criadlos en disciplina y amonestación del Señor"' },
      { libroId: 71, libroNombre: '1 Juan',      capitulo: 4,  versiculoInicio: 20, versiculoFin: 21, descripcion: '"El que no ama a su hermano a quien ve, ¿cómo puede amar a Dios a quien no ve?"' },
      { libroId: 19, libroNombre: 'Salmos',      capitulo: 127, versiculoInicio: 3, versiculoFin: 3,  descripcion: '"Los hijos son una herencia del Señor; los frutos del vientre, una recompensa"' },
    ],
  },
  {
    id: 'paternidad',
    titulo: 'Incertidumbre del padre',
    descripcion: 'Cuando no sabes quién es tu padre — o si un hijo es tuyo',
    emoji: '👨‍👦',
    color: '#4f46e5',
    pasajes: [
      { libroId: 24, libroNombre: 'Jeremías',    capitulo: 1,   versiculoInicio: 5,  versiculoFin: 5,  descripcion: '"Antes que te formara en el vientre te conocí" — tu identidad la fija Dios, no la biología' },
      { libroId: 19, libroNombre: 'Salmos',      capitulo: 139, versiculoInicio: 13, versiculoFin: 16, descripcion: '"Tú formaste mis entrañas... fui formado en lo más recóndito de la tierra"' },
      { libroId: 19, libroNombre: 'Salmos',      capitulo: 27,  versiculoInicio: 10, versiculoFin: 10, descripcion: '"Aunque mi padre y mi madre me dejaran, el Señor me recogerá"' },
      { libroId: 52, libroNombre: 'San Juan',    capitulo: 1,   versiculoInicio: 12, versiculoFin: 13, descripcion: '"A todos los que lo recibieron... les dio el derecho de ser hijos de Dios"' },
      { libroId: 54, libroNombre: 'Romanos',     capitulo: 8,   versiculoInicio: 15, versiculoFin: 16, descripcion: '"Han recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre!"' },
    ],
  },
]

export default function EmocioneScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>¿Cómo estás hoy?</Text>
        <Text style={s.subtitulo}>La Biblia tiene una palabra para cada momento</Text>
      </View>

      <FlatList
        data={EMOCIONES}
        keyExtractor={e => e.id}
        numColumns={2}
        columnWrapperStyle={s.fila}
        contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 20 }]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[s.card, { borderTopColor: item.color, borderTopWidth: 3 }]}
            onPress={() => nav.navigate('RutaDetalle', { ruta: item })}
            activeOpacity={0.8}
          >
            <Text style={s.emoji}>{item.emoji}</Text>
            <Text style={s.cardTitulo}>{item.titulo}</Text>
            <Text style={s.cardDesc} numberOfLines={2}>{item.descripcion}</Text>
            <Text style={[s.verNum, { color: item.color }]}>{item.pasajes.length} versículos</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: C.fondo },
  header:     { paddingBottom: 16, paddingHorizontal: 20 },
  backBtn:    { marginBottom: 8 },
  backTxt:    { color: C.acento, fontSize: 16 },
  titulo:     { fontSize: 26, fontWeight: '700', color: C.texto },
  subtitulo:  { color: C.subTexto, fontSize: 14, marginTop: 4 },
  notaDc:     { color: '#a78bfa', fontSize: 12, marginTop: 6 },
  lista:      { paddingHorizontal: 16, paddingTop: 8 },
  fila:       { gap: 12, marginBottom: 12 },
  card:       { width: CARD_W, backgroundColor: C.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.borde },
  emoji:      { fontSize: 32, marginBottom: 10 },
  cardTitulo: { color: C.texto, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  cardDesc:   { color: C.subTexto, fontSize: 12, lineHeight: 17, marginBottom: 10 },
  verNum:     { fontSize: 11, fontWeight: '700' },
})
