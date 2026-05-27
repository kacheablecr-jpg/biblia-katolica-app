import React, { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Speech from 'expo-speech'

const C = {
  fondo:   '#0f172a',
  card:    '#1e293b',
  texto:   '#f1f5f9',
  sub:     '#94a3b8',
  acento:  '#4ade80',
  borde:   '#334155',
  bgH:     '#052e16',
  bgHL:    '#166534',
}

interface Punto {
  titulo: string
  texto:  string
  cita?:  string
}

interface Alegria {
  id:       string
  emoji:    string
  titulo:   string
  subtitulo:string
  intro:    string
  puntos:   Punto[]
  promesa:  string
}

const ALEGRIAS: Alegria[] = [
  {
    id:       '1',
    emoji:    '😊',
    titulo:   '¿Qué es la alegría verdadera?',
    subtitulo:'La diferencia entre lo que el mundo llama felicidad y lo que Dios llama gozo',
    intro:
      'El mundo dice que la felicidad depende de lo que te pasa. La Biblia dice que el gozo viene de Quién vive en ti. Son cosas completamente distintas.',
    puntos: [
      {
        titulo: 'Felicidad vs. gozo',
        texto:
          'La palabra griega del Nuevo Testamento para gozo es "chara" — viene de "charis", que significa gracia. El gozo bíblico no es una emoción que viene y va según las circunstancias. Es una realidad que nace de saber que eres amado por Dios, perdonado y con propósito. No desaparece cuando las cosas salen mal.',
        cita: '«El gozo del Señor es vuestra fortaleza.»\n— Nehemías 8:10',
      },
      {
        titulo: 'Shalom — la palabra más completa',
        texto:
          'En el Antiguo Testamento, la palabra hebrea "shalom" — traducida como paz — en realidad significa bienestar integral: salud, relaciones sanas, propósito, plenitud. Es la palabra que Dios usa para describir lo que quiere darte. No solo ausencia de problemas, sino presencia de todo lo bueno.',
        cita: '«Pues yo sé los planes que tengo para ustedes, planes de bienestar (shalom) y no de calamidad.»\n— Jeremías 29:11',
      },
      {
        titulo: 'El fruto — no el esfuerzo',
        texto:
          'El gozo no se fabrica a fuerza de voluntad ni de actitud positiva. Es un fruto del Espíritu Santo. Eso significa que crece en ti cuando estás conectado a la fuente — como un árbol que da fruto no por esfuerzo sino por estar bien enraizado.',
        cita: '«El fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, dominio propio.»\n— Gálatas 5:22-23',
      },
      {
        titulo: 'Jesús: "para que su gozo esté en ustedes"',
        texto:
          'Jesús no vino a darte reglas — vino a darte su propio gozo. En la noche antes de morir, pensando en todo lo que venía, habló de gozo. Ese es el tipo de gozo que la Biblia ofrece: el que sobrevive incluso a la cruz.',
        cita: '«Les he dicho estas cosas para que mi gozo esté en ustedes, y su gozo sea completo.»\n— Juan 15:11',
      },
    ],
    promesa:
      '«Ustedes ahora están tristes, pero volveré a verlos y se alegrarán, y nadie les quitará esa alegría.»\n— Juan 16:22',
  },
  {
    id:       '2',
    emoji:    '❤️',
    titulo:   'La alegría en el amor y las relaciones',
    subtitulo:'Qué dice la Biblia sobre amar y ser amado de verdad',
    intro:
      'El ser humano fue creado para la relación — con Dios y con otros. La Biblia tiene mucho que decir sobre el amor, y casi todo va en contra de lo que la cultura popular enseña.',
    puntos: [
      {
        titulo: 'El amor más grande que existe',
        texto:
          'La Biblia describe el amor de Dios como "agape" — un amor incondicional que no depende de mérito. Antes de que hicieras algo bueno o malo, Dios ya te amaba. Ese es el fundamento de toda alegría en el amor: primero saber que eres amado sin condiciones.',
        cita: '«En esto consiste el amor: no en que nosotros hayamos amado a Dios, sino en que él nos amó a nosotros.»\n— 1 Juan 4:10',
      },
      {
        titulo: 'El amor de 1 Corintios 13',
        texto:
          'El capítulo más conocido sobre el amor en la Biblia no habla de sentimientos — habla de decisiones. El amor es paciente, es servicial, no busca lo suyo. Ese tipo de amor no se termina cuando la emoción inicial se enfría, porque no depende de la emoción — depende del compromiso.',
        cita: '«El amor es paciente, es bondadoso. El amor no tiene envidia; el amor no es jactancioso, no se envanece.»\n— 1 Corintios 13:4',
      },
      {
        titulo: 'La amistad verdadera',
        texto:
          'La Biblia valora la amistad profunda como una de las grandes bendiciones de la vida. La historia de David y Jonatán, de Rut y Noemí, muestra que hay amistades que son más cercanas que la familia. Proverbios habla del amigo que ama en todo tiempo — que está ahí en lo bueno y en lo malo.',
        cita: '«El amigo ama en todo tiempo, y es como un hermano en tiempo de angustia.»\n— Proverbios 17:17',
      },
      {
        titulo: 'Cómo encontrar el amor que buscas',
        texto:
          'La paradoja del amor bíblico es que se encuentra cuando dejas de buscarlo para ti y empiezas a darlo. El que busca amar encuentra amor. El que solo busca ser amado raramente encuentra lo que quiere. "Amense los unos a los otros como yo los he amado" — el modelo es Cristo, no las películas.',
        cita: '«Este es mi mandamiento: que se amen unos a otros, como yo los he amado.»\n— Juan 15:12',
      },
    ],
    promesa:
      '«Nada en toda la creación podrá separarnos del amor de Dios que es en Cristo Jesús, nuestro Señor.»\n— Romanos 8:39',
  },
  {
    id:       '3',
    emoji:    '🌅',
    titulo:   'La alegría de empezar de nuevo',
    subtitulo:'La Biblia está llena de segundas oportunidades',
    intro:
      'Uno de los temas más repetidos en toda la Biblia es la restauración. Dios tiene una historia larga de tomar vidas rotas y rehacerlas. Tu pasado no define tu futuro cuando está en las manos de Dios.',
    puntos: [
      {
        titulo: 'Cada mañana es nueva',
        texto:
          'El libro de Lamentaciones fue escrito por alguien que lo había perdido todo — la ciudad destruida, el templo en ruinas. Y en medio de ese dolor escribió uno de los versículos más esperanzadores de toda la Biblia. Las misericordias de Dios se renuevan cada mañana. No una vez. Cada mañana.',
        cita: '«Las misericordias del Señor son nuevas cada mañana; grande es su fidelidad.»\n— Lamentaciones 3:22-23',
      },
      {
        titulo: 'El hijo pródigo — la historia más bella sobre empezar de nuevo',
        texto:
          'Jesús contó la historia de un hijo que se fue de su casa, desperdició todo y volvió derrotado. El padre no esperó que llegara a la puerta — corrió a encontrarlo. Eso es lo que Dios hace con los que regresan. No espera que te arregles solo — sale corriendo a encontrarte.',
        cita: '«Cuando aún estaba lejos, lo vio su padre y se compadeció de él. Corrió y lo abrazó y lo besó.»\n— Lucas 15:20',
      },
      {
        titulo: 'Pedro — el que negó a Jesús y lo lideró todo',
        texto:
          'Pedro negó conocer a Jesús tres veces. Pensó que todo había terminado. Después de la resurrección, Jesús lo buscó específicamente, lo restauró con la misma cantidad de preguntas que Pedro lo había negado, y lo nombró líder de su iglesia. Nadie en la Biblia está demasiado caído para ser restaurado.',
        cita: '«¿Me amas? Apacienta mis ovejas.»\n— Juan 21:17',
      },
      {
        titulo: 'Lo nuevo que Dios hace',
        texto:
          'Isaías escribe en nombre de Dios una promesa que resuena a lo largo de toda la Biblia: "He aquí que hago cosa nueva." No una versión mejorada de lo viejo. Una cosa nueva. Eso es lo que Dios puede hacer con tu vida cuando se la entregas.',
        cita: '«He aquí que yo hago cosa nueva; pronto saldrá a luz. ¿No la conocerás? Abriré camino en el desierto.»\n— Isaías 43:19',
      },
    ],
    promesa:
      '«De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.»\n— 2 Corintios 5:17',
  },
  {
    id:       '4',
    emoji:    '🎯',
    titulo:   'La alegría del propósito',
    subtitulo:'Saber para qué estás aquí cambia todo',
    intro:
      'Una de las fuentes más profundas de alegría es saber que tu vida tiene sentido. La Biblia no solo dice que tienes propósito — dice que ese propósito fue diseñado antes de que nacieras.',
    puntos: [
      {
        titulo: 'Fuiste diseñado con un propósito',
        texto:
          'El libro de los Salmos describe algo asombroso: antes de que nacieras, Dios ya te conocía. Ya había pensado en ti. Ya tenía planes para ti. No eres un accidente biológico — eres una persona creada con intención.',
        cita: '«Mis huesos no te fueron desconocidos cuando en lo más recóndito fui formado. Tus ojos vieron mi embrión.»\n— Salmo 139:15-16',
      },
      {
        titulo: 'Planes de bienestar, no de calamidad',
        texto:
          'La promesa de Jeremías 29:11 fue escrita a un pueblo que estaba en el exilio — en la peor situación de su historia. Y en ese momento Dios dijo: "tengo planes para ti, y son buenos." Si esa promesa fue para ellos ahí, es para ti donde estás.',
        cita: '«Porque yo sé los planes que tengo para vosotros, planes de bienestar y no de calamidad, para daros un futuro y una esperanza.»\n— Jeremías 29:11',
      },
      {
        titulo: 'Creado para buenas obras',
        texto:
          'Pablo escribe que el creyente fue "creado en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano". Hay cosas que solo tú puedes hacer. Hay personas que solo tú puedes alcanzar. Cuando empiezas a vivir eso, aparece una alegría que ningún logro personal puede replicar.',
        cita: '«Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano.»\n— Efesios 2:10',
      },
      {
        titulo: 'El propósito más simple y más grande',
        texto:
          'Cuando le preguntaron a Jesús cuál era el mandamiento más grande, resumió toda la Biblia en dos cosas: amar a Dios con todo lo que eres, y amar a tu prójimo como a ti mismo. Ahí está el propósito. No necesitas una vocación extraordinaria — necesitas vivir esas dos cosas bien.',
        cita: '«Amarás al Señor tu Dios con todo tu corazón, con toda tu alma y con toda tu mente. Este es el primero y más grande mandamiento.»\n— Mateo 22:37-38',
      },
    ],
    promesa:
      '«El que comenzó en ustedes la buena obra la perfeccionará hasta el día de Cristo Jesús.»\n— Filipenses 1:6',
  },
  {
    id:       '5',
    emoji:    '🕊️',
    titulo:   'La alegría de ser perdonado',
    subtitulo:'La paz que solo trae el perdón',
    intro:
      'Hay una alegría específica que solo se siente cuando sabes que fuiste perdonado completamente. El Salmo 32 lo describe con una imagen hermosa: como quitarte un peso enorme de encima.',
    puntos: [
      {
        titulo: 'El peso que se va',
        texto:
          'David escribe el Salmo 32 después de haber cometido errores graves. Describe cómo mientras guardó silencio sobre sus faltas, su cuerpo se consumía y gemía todo el día. Cuando finalmente lo confesó, la carga desapareció. El perdón no es solo un concepto religioso — es una experiencia física de alivio.',
        cita: '«Bienaventurado aquel cuya transgresión ha sido perdonada, y cubierto su pecado.»\n— Salmo 32:1',
      },
      {
        titulo: 'Tan lejos como el oriente del occidente',
        texto:
          'El Salmo 103 usa una imagen geográfica para describir el perdón de Dios: tan lejos como el oriente del occidente. Esas dos direcciones nunca se encuentran — pueden alejarse infinitamente sin jamás tocarse. Eso es lo que Dios hace con tus errores cuando los confiesas.',
        cita: '«Como está de lejos el oriente del occidente, hizo alejar de nosotros nuestras transgresiones.»\n— Salmo 103:12',
      },
      {
        titulo: 'La mujer que ungió los pies de Jesús',
        texto:
          'Una mujer con mala fama en la ciudad entró a la casa de un fariseo donde estaba Jesús, lloró a sus pies y los ungió con perfume. La sala entera la miraba con desprecio. Jesús dijo: "sus pecados, que son muchos, son perdonados, porque amó mucho." La que más siente el perdón es la que más ama.',
        cita: '«Sus pecados, que son muchos, son perdonados, porque amó mucho.»\n— Lucas 7:47',
      },
      {
        titulo: 'El perdón que tú también puedes dar',
        texto:
          'La alegría del perdón no es solo recibirlo — también viene de darlo. Guardar el resentimiento es como tomar veneno y esperar que le haga daño al otro. Cuando perdonas, te liberas tú. Jesús lo enseñó: perdona como fuiste perdonado.',
        cita: '«Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó en Cristo.»\n— Efesios 4:32',
      },
    ],
    promesa:
      '«Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados y limpiarnos de toda maldad.»\n— 1 Juan 1:9',
  },
  {
    id:       '6',
    emoji:    '💪',
    titulo:   'La alegría en medio del dolor',
    subtitulo:'Un gozo que no desaparece cuando las cosas se ponen difíciles',
    intro:
      'La Biblia no promete una vida sin dolor. Lo que promete es un gozo que puede coexistir con el sufrimiento — algo que el mundo no puede entender y que solo se explica desde adentro.',
    puntos: [
      {
        titulo: 'Santiago: encuentren alegría en las pruebas',
        texto:
          'Una de las instrucciones más contracultura de toda la Biblia: cuando enfrentes pruebas, tenlas por motivo de alegría. No porque el dolor no duela, sino porque las pruebas producen algo que no se puede obtener de otra manera: una fe probada, una paciencia formada, un carácter que resiste.',
        cita: '«Hermanos míos, tened por sumo gozo cuando os halléis en diversas pruebas, sabiendo que la prueba de vuestra fe produce paciencia.»\n— Santiago 1:2-3',
      },
      {
        titulo: 'Pablo y Silas cantando en la cárcel',
        texto:
          'Hechos 16 narra que Pablo y Silas fueron golpeados, encarcelados y puestos en el cepo. A medianoche — no al amanecer cuando ya hay esperanza, sino en la oscuridad total — estaban cantando himnos. Eso no es negación del dolor. Es gozo que vive más profundo que el dolor.',
        cita: '«A medianoche, Pablo y Silas oraban y cantaban himnos a Dios; y los presos los oían.»\n— Hechos 16:25',
      },
      {
        titulo: 'El valor del sufrimiento en Romanos',
        texto:
          'Pablo no romantiza el dolor, pero sí describe su proceso: la tribulación produce paciencia, la paciencia produce carácter, el carácter produce esperanza. Hay cosas que solo se forman en el fuego. Y esa esperanza — dice Pablo — no avergüenza, porque el amor de Dios está derramado en nuestros corazones.',
        cita: '«La tribulación produce paciencia; la paciencia, prueba; y la prueba, esperanza; y la esperanza no avergüenza.»\n— Romanos 5:3-5',
      },
      {
        titulo: 'La promesa que lo sostiene todo',
        texto:
          'En el momento más oscuro, la promesa de Jesús es sencilla: "Yo estoy con ustedes todos los días." No que el dolor desaparecerá inmediatamente. Sino que en el dolor, no estarás solo. Esa presencia es la fuente del gozo que el mundo no puede entender.',
        cita: '«Y les aseguro que estaré con ustedes siempre, hasta el fin del mundo.»\n— Mateo 28:20',
      },
    ],
    promesa:
      '«Los que sembraron con lágrimas, con regocijo segarán. El que llora al ir sembrando, volverá a casa con cantos de alegría.»\n— Salmo 126:5-6',
  },
  {
    id:       '7',
    emoji:    '🌿',
    titulo:   'La alegría de lo simple',
    subtitulo:'El contentamiento que viene de agradecer lo que ya tienes',
    intro:
      'Vivimos en una cultura que siempre dice "un poco más". La Biblia propone algo radical: el contentamiento. No resignación — sino la capacidad de encontrar alegría en lo que ya tienes.',
    puntos: [
      {
        titulo: 'Aprendido, no heredado',
        texto:
          'Pablo escribe desde la cárcel que ha "aprendido" a estar contento en toda situación. No dice que nació así, ni que las circunstancias son irrelevantes. Dice que lo aprendió. El contentamiento es una habilidad que se desarrolla, no un temperamento que se tiene o no se tiene.',
        cita: '«He aprendido a estar contento en cualquier situación en que me encuentre.»\n— Filipenses 4:11',
      },
      {
        titulo: 'El trabajo y el descanso como dones',
        texto:
          'Eclesiastés, el libro más filosófico de la Biblia, dice algo hermoso: comer, beber y disfrutar del fruto de tu trabajo es un don de Dios. No necesitas algo extraordinario para ser feliz. La comida con familia, el trabajo bien hecho, el descanso merecido — esas cosas simples son regalos de Dios.',
        cita: '«No hay nada mejor para el hombre que comer y beber, y que su alma se alegre en su trabajo. También he visto que esto es de la mano de Dios.»\n— Eclesiastés 2:24',
      },
      {
        titulo: 'La gratitud como práctica',
        texto:
          'La Biblia menciona dar gracias en toda situación decenas de veces. No es una actitud positiva forzada — es un acto de fe que reconoce que detrás de cada bendición hay un Dios que da. Cuando practicas la gratitud, empiezas a ver cuánto ya tienes. Y eso transforma la alegría que sientes.',
        cita: '«Den gracias en todo, porque esta es la voluntad de Dios para ustedes en Cristo Jesús.»\n— 1 Tesalonicenses 5:18',
      },
      {
        titulo: 'Los pájaros y las flores',
        texto:
          'Jesús señaló los pájaros del cielo y las flores del campo y dijo: si Dios cuida de ellos, cuánto más cuidará de ti. No estés lleno de ansiedad por lo que te falta. Tu Padre sabe lo que necesitas antes de que se lo pidas. Esa confianza es la base del contentamiento.',
        cita: '«Miren las aves del cielo: no siembran ni cosechan ni almacenan en graneros; sin embargo, el Padre celestial las alimenta.»\n— Mateo 6:26',
      },
    ],
    promesa:
      '«La piedad con contentamiento es una gran ganancia, pues nada trajimos a este mundo, y nada podremos llevarnos.»\n— 1 Timoteo 6:6-7',
  },
  {
    id:       '8',
    emoji:    '⚓',
    titulo:   'La alegría que no depende de lo que pasa',
    subtitulo:'Una paz que sobrepasa todo entendimiento',
    intro:
      'La pregunta más honesta sobre la fe es esta: ¿puedes estar bien cuando todo va mal? La Biblia no solo dice que es posible — describe cómo.',
    puntos: [
      {
        titulo: 'La paz que el mundo no puede dar',
        texto:
          'Jesús hace una distinción que lo dice todo: "Mi paz les doy. No la que el mundo da." La paz que el mundo ofrece depende de las circunstancias — buen trabajo, buena salud, buenas relaciones. La paz de Jesús es diferente: existe dentro de las circunstancias difíciles, no a pesar de ellas.',
        cita: '«La paz les dejo; mi paz les doy. No se la doy como el mundo la da. No dejen que su corazón se turbe ni se llene de miedo.»\n— Juan 14:27',
      },
      {
        titulo: 'Filipenses 4 — la receta de la paz',
        texto:
          'Pablo da pasos concretos: no se angustien por nada, oren por todo, den gracias en todo, y piensen en lo que es verdadero, honesto, justo y bueno. El resultado — promete — es una paz que supera toda comprensión humana, que guardará su corazón y su mente.',
        cita: '«Y la paz de Dios, que sobrepasa todo entendimiento, guardará sus corazones y sus mentes en Cristo Jesús.»\n— Filipenses 4:7',
      },
      {
        titulo: 'Habacuc — aunque no florezca la higuera',
        texto:
          'El profeta Habacuc enfrentó un colapso total: sin cosecha, sin ganado, sin nada. Y en ese escenario de devastación escribió una declaración que es uno de los textos más poderosos de toda la Biblia: "Con todo, yo me alegraré en el Señor." No "cuando todo mejore". Ahora. En la nada.',
        cita: '«Aunque la higuera no florezca... con todo, yo me alegraré en el Señor, me gozaré en el Dios de mi salvación.»\n— Habacuc 3:17-18',
      },
      {
        titulo: 'El secreto que Pablo revela',
        texto:
          'Pablo dice que hay un "secreto" — una palabra que en griego significa un misterio iniciático — para estar contento en todo. Ese secreto es "todo lo puedo en Cristo que me fortalece." No es una fórmula mágica — es la experiencia acumulada de confiar en Dios en situaciones difíciles y ver que Él sostiene.',
        cita: '«Todo lo puedo en Cristo que me fortalece.»\n— Filipenses 4:13',
      },
    ],
    promesa:
      '«Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera, porque en ti ha confiado.»\n— Isaías 26:3',
  },
  {
    id:       '9',
    emoji:    '🤲',
    titulo:   'La alegría de servir a otros',
    subtitulo:'La paradoja: cuando das, recibes más',
    intro:
      'Uno de los descubrimientos más sorprendentes que hace quien empieza a servir a otros es que termina siendo el más beneficiado. La Biblia lo describe como una ley del reino de Dios.',
    puntos: [
      {
        titulo: 'La paradoja del dar',
        texto:
          'Jesús dijo algo que va contra toda lógica económica: "hay más alegría en dar que en recibir." La ciencia del bienestar hoy confirma lo mismo — las personas más felices del mundo son las más generosas. No es coincidencia. Es un principio del diseño humano.',
        cita: '«Más bienaventurado es dar que recibir.»\n— Hechos 20:35',
      },
      {
        titulo: 'El buen samaritano — encontrar el propósito en el camino',
        texto:
          'El sacerdote y el levita pasaron de largo. El samaritano — el que menos debía ayudar según las reglas sociales de la época — se detuvo. Jesús terminó la historia preguntando: "¿Cuál de los tres fue el prójimo?" El que encontró alegría en ese camino no fue el que llegó a su destino más rápido.',
        cita: '«¿Cuál de estos tres te parece que fue el prójimo del que cayó en manos de los ladrones?»\n— Lucas 10:36',
      },
      {
        titulo: 'Visitar al enfermo es visitar a Cristo',
        texto:
          'Jesús dijo que cuando visitamos al enfermo, al preso, al hambriento — lo hacemos a Él. Eso da una dimensión completamente nueva al servicio. No eres solo voluntario en un comedor social — eres la presencia de Cristo para esa persona. Y la alegría que viene de eso no tiene comparación.',
        cita: '«En verdad les digo que todo lo que hicieron por uno de estos hermanos míos más pequeños, por mí lo hicieron.»\n— Mateo 25:40',
      },
      {
        titulo: 'El que riega será regado',
        texto:
          'Proverbios lo pone de manera muy directa: el que da libremente recibe más, y el que riega a otros será regado. No como promesa de prosperidad material, sino como ley de la vida: lo que siembras, cosechas. Sembrar amor y servicio produce una vida llena de las mismas cosas.',
        cita: '«El alma generosa será prosperada, y el que saciare, él también será saciado.»\n— Proverbios 11:25',
      },
    ],
    promesa:
      '«Den, y se les dará. Se les echará en el regazo una medida llena, apretada, sacudida y desbordante.»\n— Lucas 6:38',
  },
  {
    id:       '10',
    emoji:    '🌟',
    titulo:   'La alegría de la esperanza',
    subtitulo:'Un futuro con Dios que cambia cómo vives hoy',
    intro:
      'La esperanza bíblica no es optimismo vago — es certeza sobre un futuro que Dios ha prometido. Y esa certeza sobre el futuro transforma completamente el presente.',
    puntos: [
      {
        titulo: 'Una esperanza que no avergüenza',
        texto:
          'Pablo dice que la esperanza no avergüenza — no defrauda, no decepciona — porque está fundada en el amor de Dios derramado en nuestros corazones. No es ilusión. Es confianza en el carácter de Dios, que ha demostrado ser fiel.',
        cita: '«La esperanza no avergüenza, porque el amor de Dios ha sido derramado en nuestros corazones por el Espíritu Santo.»\n— Romanos 5:5',
      },
      {
        titulo: 'El final de la historia',
        texto:
          'El libro del Apocalipsis termina con una promesa que resume toda la Biblia: Dios mismo vendrá a vivir entre los suyos, limpiará toda lágrima, y ya no habrá muerte, ni llanto, ni dolor. Eso no es escapismo — es el final hacia el cual toda la historia se está moviendo.',
        cita: '«Él les enjugará toda lágrima de sus ojos, y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor.»\n— Apocalipsis 21:4',
      },
      {
        titulo: 'La esperanza como ancla',
        texto:
          'La carta a los Hebreos describe la esperanza como un ancla para el alma — firme y segura. Un ancla no impide las tormentas, pero impide que el barco se pierda en ellas. La esperanza bíblica no elimina los problemas, pero mantiene tu alma anclada cuando todo se mueve.',
        cita: '«La cual tenemos como segura y firme ancla del alma, y que penetra hasta dentro del velo.»\n— Hebreos 6:19',
      },
      {
        titulo: 'Lo que viene es mejor',
        texto:
          'Pablo tiene una perspectiva que solo se puede tener desde la esperanza: "Para mí el vivir es Cristo y el morir es ganancia." No le tenía miedo al futuro porque sabía que el futuro estaba en las mejores manos posibles. Esa confianza en el futuro libera una alegría enorme en el presente.',
        cita: '«Para mí el vivir es Cristo, y el morir es ganancia.»\n— Filipenses 1:21',
      },
    ],
    promesa:
      '«Porque para mí el futuro está lleno de esperanza.»\n— Jeremías 31:17',
  },
]

function buildTexto(a: Alegria): string {
  const partes: string[] = [a.titulo, '. ', a.intro]
  a.puntos.forEach((pt, i) => {
    partes.push(` Punto ${i + 1}: ${pt.titulo}. ${pt.texto}`)
    if (pt.cita) {
      const soloTexto = pt.cita.split('\n')[0].replace(/[«»]/g, '')
      partes.push(` ${soloTexto}`)
    }
  })
  partes.push(` Promesa para recordar: ${a.promesa.split('\n')[0].replace(/[«»]/g, '')}`)
  return partes.join('')
}

export default function AlegriasScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [abierto, setAbierto] = useState<string | null>(null)
  const [leyendo, setLeyendo] = useState<string | null>(null)

  useEffect(() => () => { Speech.stop() }, [])

  const toggle = (id: string) => {
    if (abierto === id) { Speech.stop(); setLeyendo(null) }
    setAbierto(prev => (prev === id ? null : id))
  }

  const escuchar = (a: Alegria) => {
    if (leyendo === a.id) { Speech.stop(); setLeyendo(null); return }
    Speech.stop()
    setLeyendo(a.id)
    Speech.speak(buildTexto(a), {
      language: 'es-ES', rate: 0.9,
      onDone: () => setLeyendo(null),
      onError: () => setLeyendo(null),
    })
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.back} activeOpacity={0.7}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>😊 Busca la Alegría</Text>
        <Text style={s.subtitulo}>Lo que la Biblia dice sobre la felicidad verdadera</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 24 }}>
        {ALEGRIAS.map(a => {
          const abierto_ = abierto === a.id
          return (
            <View key={a.id} style={s.card}>
              <TouchableOpacity onPress={() => toggle(a.id)} activeOpacity={0.8} style={s.cardHeader}>
                <Text style={s.emoji}>{a.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.tituloCard}>{a.titulo}</Text>
                  <Text style={s.subtituloCard}>{a.subtitulo}</Text>
                </View>
                <Text style={[s.chevron, abierto_ && s.chevronAbierto]}>›</Text>
              </TouchableOpacity>

              {abierto_ && (
                <View style={s.respuesta}>
                  <View style={s.separador} />

                  <TouchableOpacity
                    style={[s.audioBtn, leyendo === a.id && s.audioBtnActivo]}
                    onPress={() => escuchar(a)}
                    activeOpacity={0.8}
                  >
                    <Text style={s.audioBtnIcon}>{leyendo === a.id ? '⏹' : '🔊'}</Text>
                    <Text style={[s.audioBtnTxt, leyendo === a.id && s.audioBtnTxtActivo]}>
                      {leyendo === a.id ? 'Detener audio' : 'Escuchar'}
                    </Text>
                  </TouchableOpacity>

                  <Text style={s.introTxt}>{a.intro}</Text>

                  {a.puntos.map((punto, i) => (
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

                  <View style={s.promesaBox}>
                    <Text style={s.promesaLabel}>🌿 Promesa para llevar</Text>
                    <Text style={s.promesaTxt}>{a.promesa}</Text>
                  </View>
                </View>
              )}
            </View>
          )
        })}

        <Text style={s.nota}>Más temas próximamente ✝</Text>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container:       { flex: 1, backgroundColor: C.fondo },
  header:          { backgroundColor: C.bgH, paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16 },
  back:            { marginBottom: 12 },
  backTxt:         { color: C.acento, fontSize: 15 },
  titulo:          { color: C.texto, fontSize: 24, fontWeight: '700', marginBottom: 6 },
  subtitulo:       { color: '#bbf7d0', fontSize: 13, lineHeight: 18 },

  card:            { backgroundColor: C.card, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: C.borde, overflow: 'hidden' },
  cardHeader:      { flexDirection: 'row', alignItems: 'flex-start', padding: 16, gap: 12 },
  emoji:           { fontSize: 28, marginTop: 2 },
  tituloCard:      { color: C.texto, fontSize: 15, fontWeight: '600', lineHeight: 21 },
  subtituloCard:   { color: C.acento, fontSize: 12, marginTop: 3, lineHeight: 17 },
  chevron:         { color: C.sub, fontSize: 26, marginLeft: 4 },
  chevronAbierto:  { transform: [{ rotate: '90deg' }] },

  respuesta:       { paddingHorizontal: 16, paddingBottom: 16 },
  separador:       { height: 1, backgroundColor: C.borde, marginBottom: 14 },
  audioBtn:        { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#052e16', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 14, borderWidth: 1, borderColor: '#166534' },
  audioBtnActivo:  { backgroundColor: '#1a0a0a', borderColor: '#991b1b' },
  audioBtnIcon:    { fontSize: 16 },
  audioBtnTxt:     { color: C.acento, fontSize: 14, fontWeight: '600' },
  audioBtnTxtActivo: { color: '#f87171' },
  introTxt:        { color: C.sub, fontSize: 14, lineHeight: 21, marginBottom: 16, fontStyle: 'italic' },

  punto:           { marginBottom: 16 },
  puntoTitulo:     { color: C.acento, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  puntoTexto:      { color: C.texto, fontSize: 14, lineHeight: 22 },
  citaBox:         { backgroundColor: '#1c1917', borderLeftWidth: 3, borderLeftColor: C.acento, borderRadius: 8, padding: 12, marginTop: 8 },
  citaTxt:         { color: '#d1fae5', fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  promesaBox:      { backgroundColor: '#052e16', borderRadius: 12, padding: 14, marginTop: 4, borderWidth: 1, borderColor: C.bgHL },
  promesaLabel:    { color: C.acento, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  promesaTxt:      { color: '#d1fae5', fontSize: 14, lineHeight: 21, fontStyle: 'italic' },

  nota:            { color: C.sub, fontSize: 13, textAlign: 'center', marginTop: 8, marginBottom: 4 },
})
