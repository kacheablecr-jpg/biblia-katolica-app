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
  mensaje:   string
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
    mensaje:
      'Todos somos hijos del mismo Padre. La Biblia no habla de un origen biológico solamente — habla de dignidad compartida. Detrás de esta pregunta está la verdad más profunda del Génesis: no importa la raza, el origen ni la cultura, todos llevamos la misma imagen de Dios. Somos familia.',
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
    mensaje:
      'Nadie está tan lejos de Dios que no pueda ser encontrado. Jonás huyó, se hundió en el fondo del mar, y Dios lo buscó allí. Si hoy sientes que estás demasiado lejos, demasiado caído o demasiado perdido — el mismo Dios que preparó un pez para Jonás te está buscando a ti.',
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
    mensaje:
      'Dios no está mirando tu piel — está mirando tu corazón. La pregunta que la Biblia nos invita a hacernos no es "¿me condena este tatuaje?" sino "¿con qué propósito vivo mi vida?" Tu cuerpo es templo del Espíritu Santo no por lo que tiene en la piel, sino por Aquel que vive adentro.',
  },
  {
    id:        '4',
    emoji:     '🔥',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre la impureza sexual?',
    intro:
      'La Biblia no menciona explícitamente el placer solitario por su nombre, pero sí habla con claridad sobre la pureza del corazón, los deseos y el dominio propio. Aquí está lo que los textos realmente dicen.',
    puntos: [
      {
        titulo: 'El caso de Onán — el versículo más citado',
        texto:
          'En Génesis 38, Onán derramó su semilla en tierra para no dar descendencia a su hermano muerto, según la ley del levirato. Dios lo castigó. Pero el pecado de Onán no fue el acto en sí — fue su desobediencia a la ley de dar descendencia al hermano muerto. Usarlo como condena directa al placer solitario saca el texto de contexto.',
        cita: '«Lo que hizo fue malo ante los ojos del Señor, y también a él le dio muerte.»\n— Génesis 38:10',
      },
      {
        titulo: 'Jesús habló del deseo desordenado',
        texto:
          'Jesús dejó claro que el problema no es solo el acto externo, sino el deseo que lo acompaña. Si el placer solitario va acompañado de fantasías con otras personas, entra en la categoría que Jesús llama lujuria — un deseo que cosifica al otro.',
        cita: '«Pero yo les digo que cualquiera que mira a una mujer con deseo lujurioso ya ha cometido adulterio con ella en su corazón.»\n— Mateo 5:28',
      },
      {
        titulo: 'Pablo y el dominio propio',
        texto:
          'Pablo no menciona el tema directamente, pero sí enseña que el creyente debe controlar su propio cuerpo con santidad y honor, no dejándose llevar por la pasión descontrolada.',
        cita: '«Que cada uno de ustedes sepa controlar su propio cuerpo de una manera santa y honrosa, sin dejarse llevar por los malos deseos.»\n— 1 Tesalonicenses 4:4-5',
      },
      {
        titulo: '¿Es pecado o no?',
        texto:
          'Los teólogos están divididos. Algunos lo consideran moralmente neutro si no va acompañado de lujuria. Otros, como la postura católica tradicional, lo consideran contrario al fin natural de la sexualidad. Lo que sí es claro en la Biblia es que la sexualidad humana tiene un propósito sagrado y que el dominio propio es un fruto del Espíritu.',
        cita: '«El fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, dominio propio.»\n— Gálatas 5:22-23',
      },
      {
        titulo: 'La gracia es más grande',
        texto:
          'La Biblia nunca presenta la pureza como algo que se alcanza por fuerza de voluntad sola. La enseñanza central es que donde hay lucha sincera y humilde, hay gracia. Dios no condena al que lucha — condena al que no quiere luchar.',
        cita: '«Poderoso es Dios para guardaros sin caída.»\n— Judas 1:24',
      },
    ],
    conclusion:
      'La Biblia no condena el placer solitario por su nombre, pero sí establece que la sexualidad humana es sagrada y que el dominio propio es parte de la vida cristiana. Lo más relevante no es el acto aislado sino el estado del corazón: ¿hay lujuria hacia otra persona? ¿Hay esclavitud a un hábito que daña? Ahí es donde la enseñanza bíblica aplica con más fuerza.',
    mensaje:
      'La pureza no es un logro de fuerza de voluntad — es un camino de gracia. La Biblia no llama al creyente a una vida perfecta por esfuerzo propio, sino a una vida de dependencia honesta de Dios. Donde hay lucha sincera y humilde, hay misericordia. Dios no condena al que lucha — acompaña al que no se rinde.',
  },
  {
    id:        '5',
    emoji:     '🚢',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿Noé realmente metió a todos los animales del mundo en un arca?',
    intro:
      'El relato del arca de Noé es uno de los más cuestionados de la Biblia. ¿Cómo caben millones de especies en un barco? La respuesta depende de cómo se lee el texto.',
    puntos: [
      {
        titulo: 'Lo que dice el texto exactamente',
        texto:
          'El Génesis dice que Dios mandó llevar al arca "de todo ser viviente, de toda carne, dos de cada especie". Pero el texto hebreo usa "min", que puede traducirse como "tipo" o "clase", no necesariamente cada especie biológica como la entendemos hoy.',
        cita: '«De todo lo que vive, de toda carne, harás entrar en el arca dos de cada especie.»\n— Génesis 6:19',
      },
      {
        titulo: '¿Flood local o universal?',
        texto:
          'Muchos teólogos y estudiosos bíblicos sostienen que el diluvio fue un evento regional catastrófico en el Cercano Oriente, no literalmente global. En hebreo, "eretz" (traducido como "tierra") puede referirse también a "la región" o "el territorio conocido". Un diluvio que destruyó toda la civilización conocida de Noé concordaría con el texto.',
      },
      {
        titulo: 'El tamaño del arca no era insignificante',
        texto:
          'El arca medía según el texto 300 codos de largo, 50 de ancho y 30 de alto — aproximadamente 135 metros de largo. Investigadores han calculado que podría albergar miles de "tipos" básicos de animales si el relato se lee con "tipos" en vez de "especies biológicas".',
        cita: '«La longitud del arca será de trescientos codos, su anchura de cincuenta codos y su altura de treinta codos.»\n— Génesis 6:15',
      },
      {
        titulo: 'El mensaje que no depende del debate',
        texto:
          'La pregunta literalista a veces oscurece el mensaje central del relato: la obediencia de Noé en medio de un mundo corrompido, la gracia de Dios que preserva la vida, y el arcoíris como señal de alianza eterna. Ese mensaje es poderoso independientemente de cómo se resuelva la logística del arca.',
        cita: '«Estableceré mi pacto con ustedes. Nunca más serán destruidos por las aguas del diluvio.»\n— Génesis 9:11',
      },
    ],
    conclusion:
      'El relato del arca puede leerse literalmente o como un evento regional de gran escala. Lo que sí es claro es que el texto no requiere millones de especies modernas — habla de "tipos" de animales. Pero más allá del debate logístico, el mensaje del diluvio es teológico: Dios juzga la maldad, pero preserva al justo y renueva su alianza con la humanidad.',
    mensaje:
      'Dios siempre preserva. En medio del juicio más devastador, Noé encontró gracia. El arcoíris no es solo un fenómeno atmosférico — es la firma de un Dios que hace pacto con su creación y no la abandona. En los momentos más oscuros de tu vida, esa misma promesa sigue en pie.',
  },
  {
    id:        '6',
    emoji:     '☀️',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿El sol realmente se detuvo en la batalla de Josué?',
    intro:
      'En Josué 10 hay uno de los relatos más asombrosos del Antiguo Testamento: el sol y la luna se detuvieron durante casi un día completo para que Israel ganara la batalla. ¿Qué está diciendo realmente el texto?',
    puntos: [
      {
        titulo: 'Lo que dice el texto',
        texto:
          'Josué oró pidiendo que el sol se detuviera sobre Gabaón y la luna sobre el valle de Ayalón, para que Israel tuviera tiempo de terminar la batalla antes de que cayera la noche.',
        cita: '«Sol, detente sobre Gabaón; y tú, luna, sobre el valle de Ayalón. Y el sol se detuvo y la luna se paró.»\n— Josué 10:12-13',
      },
      {
        titulo: 'El texto cita un poema antiguo',
        texto:
          'El mismo texto bíblico dice que esto está escrito en el "Libro del Justo", una colección poética antigua. Eso sugiere que el autor de Josué estaba citando lenguaje poético o litúrgico, no necesariamente un informe científico de astronomía.',
        cita: '«¿No está escrito esto en el libro del Justo?»\n— Josué 10:13',
      },
      {
        titulo: 'Interpretaciones posibles',
        texto:
          'Algunas interpretaciones: (1) Milagro literal — Dios alteró el movimiento de los cuerpos celestes. (2) Fenómeno atmosférico — una tormenta de granizo (mencionada justo antes) prolongó la oscuridad útil para Israel. (3) Lenguaje poético hiperbólico — como cuando decimos "el tiempo se detuvo" para describir un momento intenso.',
        cita: '«El Señor arrojó desde el cielo grandes piedras de granizo sobre ellos... y murieron más por el granizo que por la espada.»\n— Josué 10:11',
      },
      {
        titulo: 'Lo que no cambia',
        texto:
          'Todas las interpretaciones coinciden en lo central: Dios intervino a favor de Israel en esa batalla de una manera extraordinaria. El "cómo" es lo que se debate; el "quién actuó" es lo que el texto afirma con fuerza.',
      },
    ],
    conclusion:
      'El texto de Josué 10 proviene de un poema antiguo y está enmarcado en un contexto de milagro divino en batalla. Puede leerse como un evento literal, como lenguaje poético de victoria, o como una intervención natural extraordinaria. Lo que el texto quiere afirmar es claro: Dios peleó por Israel ese día.',
    mensaje:
      'Dios pelea por los suyos. No necesitas entender el mecanismo del milagro para confiar en que el Dios que detuvo el tiempo para Josué también puede intervenir en las batallas de tu vida. La pregunta no es "¿cómo lo hizo?" sino "¿sigo creyendo que puede hacerlo?"',
  },
  {
    id:        '7',
    emoji:     '👴',
    categoria: 'Relatos del Antiguo Testamento',
    pregunta:  '¿Realmente vivió Matusalén 969 años?',
    intro:
      'Las edades de los patriarcas en Génesis 5 son de las más desconcertantes del Antiguo Testamento. Adán vivió 930 años, Noé 950, Matusalén 969. ¿Cómo se explica esto?',
    puntos: [
      {
        titulo: 'Las edades en el texto hebreo',
        texto:
          'En Génesis 5, los patriarcas antediluvianos tienen vidas extraordinariamente largas. Matusalén es el récord con 969 años. Esta lista es muy similar a las listas de reyes sumerios en la antigua Mesopotamia, donde los reyes antes del diluvio también tenían reinados de miles de años.',
        cita: '«Todos los días de Matusalén fueron novecientos sesenta y nueve años, y murió.»\n— Génesis 5:27',
      },
      {
        titulo: 'Teoría 1: Las edades son literales',
        texto:
          'Algunos creen que antes del diluvio las condiciones de la tierra eran distintas (atmósfera, radiación, dieta) y permitían una longevidad extrema. La Biblia no explica el mecanismo — simplemente lo narra como un hecho.',
      },
      {
        titulo: 'Teoría 2: Los números tienen otro significado',
        texto:
          'En las culturas del antiguo Cercano Oriente, los números grandes en genealogías servían para expresar honor, importancia y distancia mítica en el tiempo — no conteos literales de años. Una larga vida era símbolo de bendición divina.',
      },
      {
        titulo: 'Teoría 3: El año era más corto',
        texto:
          'Algunos estudiosos sugieren que lo que se llama "año" en esos textos podría referirse a ciclos lunares más cortos o a unidades de tiempo diferentes. Bajo ese cálculo, las edades serían más parecidas a las actuales.',
      },
      {
        titulo: 'Lo que sí es claro',
        texto:
          'Los textos bíblicos muestran una tendencia clara: las edades van disminuyendo progresivamente después del diluvio. Abraham vivió 175 años, Moisés 120, David 70. El Salmo 90 dice: "Los días de nuestra vida son setenta años." Hay una trayectoria narrativa intencional.',
        cita: '«Los días de nuestra vida son setenta años, u ochenta si hay fortaleza.»\n— Salmo 90:10',
      },
    ],
    conclusion:
      'Las edades de los patriarcas son una de las partes más discutidas del Génesis. Pueden leerse literalmente, como símbolos de honor y antigüedad, o como unidades de tiempo diferentes. No existe consenso definitivo. Lo que sí revela el texto es una teología clara: Dios bendice con larga vida, y esa vida va siendo más limitada conforme la humanidad se aleja del Edén.',
    mensaje:
      'Nuestra vida es breve, y eso no es una maldición — es una invitación. El Salmo 90 dice: "Enséñanos a contar bien nuestros días, para que nuestro corazón adquiera sabiduría." Matusalén vivió 969 años; la pregunta que Dios nos hace no es cuántos años viviste, sino cómo los viviste.',
  },
  {
    id:        '8',
    emoji:     '🧬',
    categoria: 'Fe y ciencia',
    pregunta:  '¿La Biblia contradice la evolución?',
    intro:
      'Esta es una de las tensiones más debatidas entre fe y ciencia. ¿Son incompatibles el relato del Génesis y la teoría evolutiva? Depende de cómo se lea cada uno.',
    puntos: [
      {
        titulo: 'El Génesis no fue escrito como un libro de ciencias',
        texto:
          'Los primeros capítulos del Génesis responden preguntas teológicas: ¿quién creó el mundo? ¿Por qué existe el mal? ¿Cuál es la dignidad del ser humano? No responden preguntas científicas sobre el mecanismo de la creación. Leerlo como un manual de biología es un error de género literario.',
        cita: '«En el principio, Dios creó los cielos y la tierra.»\n— Génesis 1:1',
      },
      {
        titulo: 'La Iglesia Católica y la evolución',
        texto:
          'El Papa Pío XII en 1950 (Encíclica Humani Generis) y Juan Pablo II en 1996 afirmaron que la evolución biológica es compatible con la fe católica, siempre que se reconozca que Dios creó el alma humana de manera especial. La Iglesia no condena la evolución.',
      },
      {
        titulo: 'Creacionismo vs. Evolución teísta',
        texto:
          'El creacionismo literalista sostiene que Génesis 1 describe seis días literales de 24 horas. La evolución teísta sostiene que Dios usó el proceso evolutivo como su método de creación. Millones de cristianos sinceros ocupan ambas posiciones.',
      },
      {
        titulo: 'Lo que la Biblia sí afirma con claridad',
        texto:
          'Independientemente del mecanismo, la Biblia afirma: (1) Dios es el origen de todo. (2) El ser humano tiene una dignidad especial y única. (3) Fuimos creados con propósito, no por accidente. Esas verdades no dependen del debate sobre el proceso.',
        cita: '«Dios creó al ser humano a su imagen, a imagen de Dios lo creó; hombre y mujer los creó.»\n— Génesis 1:27',
      },
    ],
    conclusion:
      'La Biblia y la evolución no son necesariamente contradictorias si se entiende que hablan de cosas diferentes: la Biblia habla del "por qué" y del "quién", la ciencia habla del "cómo". La Iglesia Católica acepta la evolución biológica mientras afirma que Dios es el creador y que el alma humana tiene un origen especial. El conflicto real es entre el ateísmo y la fe, no entre la biología y la Biblia.',
    mensaje:
      'Dios no compite con la ciencia — Él es el autor del universo que la ciencia estudia. La fe no teme las preguntas, las abraza. Si el mecanismo de la creación fue la evolución o algo distinto, lo que nunca cambia es esto: fuiste creado con propósito, por un Dios personal, que te conoce por nombre.',
  },
  {
    id:        '9',
    emoji:     '📅',
    categoria: 'Fe y ciencia',
    pregunta:  '¿En cuántos días creó Dios el mundo realmente?',
    intro:
      'Génesis 1 describe la creación en seis días. Pero ¿son días de 24 horas o algo diferente? Esta pregunta ha dividido a teólogos y creyentes durante siglos.',
    puntos: [
      {
        titulo: 'La palabra hebrea "yom"',
        texto:
          'La palabra hebrea traducida como "día" es "yom". En el Antiguo Testamento, "yom" puede significar: un día de 24 horas, un período indefinido de tiempo ("el día del Señor"), o una era geológica. El contexto determina cuál.',
        cita: '«Llamó Dios a la luz Día, y a las tinieblas llamó Noche.»\n— Génesis 1:5',
      },
      {
        titulo: 'El sol no apareció hasta el cuarto día',
        texto:
          'Un detalle que muchos pasan por alto: el sol y la luna fueron creados en el cuarto día. Pero los primeros tres días ya tenían mañana y tarde. ¿Cómo hay días de 24 horas sin sol? Esto sugiere que "día" en Génesis 1 puede tener un significado diferente al astronómico.',
        cita: '«Y fue la tarde y fue la mañana: día primero.»\n— Génesis 1:5',
      },
      {
        titulo: 'El séptimo día no tiene fin',
        texto:
          'Algo muy revelador: los primeros seis días terminan con "fue la tarde y fue la mañana". El séptimo día, el de descanso de Dios, no tiene esa fórmula de cierre. Muchos teólogos interpretan esto como que el séptimo "día" del descanso de Dios aún continúa — lo que haría cada "día" un período más amplio.',
        cita: '«Bendijo Dios el día séptimo y lo santificó, porque en él reposó de toda su obra.»\n— Génesis 2:3',
      },
      {
        titulo: 'Las principales posiciones',
        texto:
          'Las posiciones más respetadas son: (1) Días literales de 24h — creacionismo joven. (2) Días-era — cada día representa millones de años. (3) Marco literario — los días son una estructura narrativa y pedagógica, no una secuencia temporal exacta. Las tres tienen defensores serios dentro del cristianismo.',
      },
    ],
    conclusion:
      'La Biblia no da una respuesta científica sobre la duración exacta de la creación. El relato del Génesis usa un lenguaje estructurado y poético. Lo que afirma con certeza es que Dios creó todo, que fue bueno, y que el ser humano ocupa un lugar especial en esa creación. El debate sobre los días refleja cuánto más profundo es el texto de lo que parece a primera vista.',
    mensaje:
      'Al final del sexto día, Dios miró todo lo que había creado y dijo que era "muy bueno". Tú eres parte de esa creación. No importa cuántos días tomó — lo que importa es que Dios te miró a ti y dijo que eras bueno. Eso no ha cambiado.',
  },
  {
    id:        '10',
    emoji:     '🧑‍🤝‍🧑',
    categoria: 'Fe y ciencia',
    pregunta:  '¿Existieron Adán y Eva como personas reales?',
    intro:
      'Esta pregunta toca tanto la fe como la genética moderna. ¿Hubo dos personas específicas al inicio de la humanidad, o son personajes simbólicos del Génesis?',
    puntos: [
      {
        titulo: 'La posición tradicional: personas históricas',
        texto:
          'La lectura tradicional cristiana — católica y protestante — sostuvo durante siglos que Adán y Eva fueron personas históricas reales, los primeros padres de la humanidad. Pablo en sus cartas los trata como figuras históricas al compararlos con Cristo.',
        cita: '«Así como en Adán todos mueren, también en Cristo todos serán vivificados.»\n— 1 Corintios 15:22',
      },
      {
        titulo: 'La genética y el "Adán cromosómico"',
        texto:
          'La genética moderna identificó un "Adán cromosómico Y" y una "Eva mitocondrial" — ancestros comunes de todos los humanos vivos. Pero no vivieron al mismo tiempo ni en el mismo lugar. Esto no descarta un origen común, pero complica la lectura de dos personas simultáneas.',
      },
      {
        titulo: 'La posición del poligenismo',
        texto:
          'Algunos teólogos y científicos católicos proponen que "Adán" representa un grupo de homínidos donde Dios infundió el alma de manera especial, no necesariamente una sola pareja. El Papa Pío XII pidió cautela con esta posición pero no la prohibió definitivamente.',
      },
      {
        titulo: 'Lo que la Biblia no puede negociar',
        texto:
          'Independientemente del debate histórico, la teología bíblica insiste en tres puntos irrenunciables: (1) La humanidad tiene un origen unitario — todos somos iguales en dignidad. (2) Hubo una caída real — algo cambió en la relación entre el hombre y Dios. (3) Necesitamos redención — y eso apunta a Cristo.',
        cita: '«Por tanto, así como el pecado entró en el mundo por un hombre...»\n— Romanos 5:12',
      },
    ],
    conclusion:
      'Si Adán y Eva fueron una pareja histórica literal o el nombre colectivo de los primeros humanos en recibir el alma, es algo que el texto bíblico solo no resuelve con certeza. Lo que la fe cristiana no puede abandonar es que el ser humano fue creado a imagen de Dios, que hubo una ruptura real con Él, y que esa ruptura necesitaba ser restaurada por Cristo.',
    mensaje:
      'Llevas en ti la imagen de Dios. Ese es el dato más importante de toda la Biblia sobre el ser humano. No importa cómo llegaste al mundo, dónde creciste ni qué has hecho — la imagen de Dios en ti no puede ser borrada. Y Cristo vino a restaurar lo que el pecado intentó romper.',
  },
  {
    id:        '11',
    emoji:     '🍷',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre el alcohol?',
    intro:
      'La Biblia habla del vino cientos de veces — a veces como bendición, a veces como advertencia. No condena el alcohol en sí, pero sí advierte con claridad sobre sus peligros.',
    puntos: [
      {
        titulo: 'El vino como bendición',
        texto:
          'En la Biblia, el vino es frecuentemente símbolo de alegría, bendición y celebración. Jesús convirtió agua en vino en Caná, y usó el vino en la Última Cena como símbolo de su sangre.',
        cita: '«El vino alegra el corazón del hombre.»\n— Salmo 104:15',
      },
      {
        titulo: 'Jesús bebió vino',
        texto:
          'Jesús mismo bebía vino — sus enemigos lo criticaban por eso. No era jugo de uva fermentado de manera distinta; era vino real. Eso hace imposible sostener que la Biblia prohíbe el alcohol de manera absoluta.',
        cita: '«Vino el Hijo del Hombre, que come y bebe, y dicen: He aquí un hombre comilón y bebedor de vino.»\n— Mateo 11:19',
      },
      {
        titulo: 'La advertencia clara: la embriaguez',
        texto:
          'Lo que la Biblia condena con fuerza no es el alcohol en sí, sino la embriaguez. Perder el control de uno mismo por el vino aparece como señal de necedad, pecado y destrucción en decenas de textos.',
        cita: '«No se emborrachen con vino, que lleva a la depravación. Al contrario, sean llenos del Espíritu.»\n— Efesios 5:18',
      },
      {
        titulo: 'El principio del dominio propio',
        texto:
          'El Nuevo Testamento enseña que el creyente debe tener dominio propio. Si el alcohol lleva a alguien a perder ese control, o si su consumo hace tropezar a un hermano más débil, la sabiduría cristiana dice que es mejor abstenerse.',
        cita: '«Todo me es permitido, pero no todo conviene; todo me es permitido, pero no todo edifica.»\n— 1 Corintios 10:23',
      },
    ],
    conclusion:
      'La Biblia no prohíbe el alcohol — lo condena cuando lleva a la embriaguez y a la pérdida del dominio propio. Jesús mismo bebió vino. El principio bíblico no es la abstinencia total obligatoria, sino la moderación, el dominio propio y la consideración de cómo nuestra conducta afecta a los demás.',
    mensaje:
      'La libertad cristiana no es permiso para todo — es la capacidad de elegir lo que edifica. El dominio propio no es una cadena; es la forma más alta de libertad. Un creyente libre no necesita el vino para alegrarse, porque su alegría viene de una fuente que nunca se agota.',
  },
  {
    id:        '12',
    emoji:     '💍',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Está prohibido el sexo premarital en la Biblia?',
    intro:
      'La Biblia no usa la frase "sexo premarital" directamente, pero sí habla con claridad sobre la fornicación, la porneia y el diseño de Dios para la sexualidad humana.',
    puntos: [
      {
        titulo: 'La palabra griega "porneia"',
        texto:
          'El Nuevo Testamento usa la palabra griega "porneia" para referirse a toda actividad sexual fuera del matrimonio. Aparece decenas de veces. Jesús, Pablo y otros la mencionan como algo que contamina al creyente y debe evitarse.',
        cita: '«Huyan de la inmoralidad sexual (porneia). Todos los demás pecados que una persona comete están fuera del cuerpo, pero el que peca sexualmente peca contra su propio cuerpo.»\n— 1 Corintios 6:18',
      },
      {
        titulo: 'El diseño original: una sola carne',
        texto:
          'Desde el Génesis, Dios diseñó la unión sexual como el sello de un pacto de por vida entre hombre y mujer. La intimidad física en la Biblia no es solo un acto físico — es la consumación de un pacto.',
        cita: '«Por eso el hombre deja a su padre y a su madre y se une a su mujer, y los dos se funden en un solo ser.»\n— Génesis 2:24',
      },
      {
        titulo: 'Pablo: el cuerpo no es para la fornicación',
        texto:
          'Pablo es el más directo: el cuerpo del creyente es templo del Espíritu Santo. Usarlo en relaciones fuera del matrimonio contradice ese propósito sagrado.',
        cita: '«¿No saben que sus cuerpos son miembros de Cristo mismo? ¿Tomaré acaso los miembros de Cristo para unirlos con una prostituta? ¡Jamás!»\n— 1 Corintios 6:15',
      },
      {
        titulo: 'No es solo una regla — es una visión',
        texto:
          'La razón bíblica no es solo "porque Dios lo prohíbe". Es porque Dios diseñó la sexualidad para ser el lenguaje de un amor total, exclusivo y permanente. El sexo fuera del matrimonio trata esa intimidad como algo menos de lo que fue diseñado para ser.',
      },
    ],
    conclusion:
      'La Biblia es clara: la sexualidad fue diseñada para el matrimonio. La "porneia" — toda actividad sexual fuera del matrimonio — es mencionada repetidamente como algo que el creyente debe evitar. No como una regla arbitraria, sino porque el diseño de Dios para la sexualidad humana apunta a algo más profundo: la imagen de un amor de pacto total e incondicional.',
    mensaje:
      'La sexualidad no es un tabú ni un instinto que reprimir — es un don sagrado. Dios la diseñó para ser el lenguaje del amor más total: entrega completa, exclusiva y permanente. Cuando la Biblia protege esa frontera, no está quitándote algo — está cuidando algo precioso que a veces nosotros mismos no sabemos valorar.',
  },
  {
    id:        '13',
    emoji:     '💔',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre el divorcio y volver a casarse?',
    intro:
      'Pocas preguntas tocan tan profundamente la vida real de tantas personas. Jesús habló del divorcio, Pablo también. Sus palabras son exigentes — y también llenas de matices importantes.',
    puntos: [
      {
        titulo: 'Lo que Jesús dijo',
        texto:
          'Jesús dijo que quien se divorcia y se vuelve a casar comete adulterio, excepto en caso de "porneia" (infidelidad). Esta excepción, conocida como la "cláusula de excepción", está en Mateo pero no en Marcos ni Lucas, lo que ha generado debate teológico.',
        cita: '«Todo el que repudie a su mujer, salvo en caso de fornicación, y se case con otra, adultera.»\n— Mateo 19:9',
      },
      {
        titulo: 'El contexto: Jesús elevó el estándar',
        texto:
          'En el tiempo de Jesús, los rabinos debatían si un hombre podía divorciarse de su esposa por cualquier motivo menor. Jesús no estaba creando una nueva ley para todos los casos — estaba elevando el estándar para proteger a la mujer, que en esa cultura quedaba desprotegida tras un divorcio.',
        cita: '«Moisés les permitió divorciarse de sus esposas por la dureza del corazón de ustedes, pero al principio no fue así.»\n— Mateo 19:8',
      },
      {
        titulo: 'Pablo y el abandono',
        texto:
          'Pablo añade otro caso: si el cónyuge no creyente abandona al creyente, este "no está bajo servidumbre" — una frase que muchos teólogos interpretan como libertad para volver a casarse.',
        cita: '«Pero si el no creyente se separa, que se separe. En tales casos el hermano o la hermana no está bajo servidumbre.»\n— 1 Corintios 7:15',
      },
      {
        titulo: 'La gracia es más grande que el fracaso',
        texto:
          'La Biblia también está llena de personas que fracasaron en sus relaciones y fueron restauradas. David, Rahab, la mujer samaritana. La enseñanza bíblica sobre el matrimonio es un ideal elevado — y la gracia de Dios alcanza a los que no pudieron mantenerlo.',
        cita: '«El Señor es compasivo y misericordioso, lento para la ira y lleno de amor.»\n— Salmo 103:8',
      },
    ],
    conclusion:
      'Jesús estableció un estándar alto para el matrimonio: fue diseñado para ser permanente. Pero reconoció la realidad del pecado y del corazón duro. Pablo añadió el caso del abandono. Las iglesias interpretan estos textos de diferente manera. Lo que nunca cambia es que Dios diseñó el matrimonio para reflejar su amor de pacto, y que su gracia alcanza a todos los que han fallado.',
    mensaje:
      'Dios no abandona a los que han fallado en el matrimonio. La Biblia está llena de personas rotas que fueron restauradas. Si has pasado por el dolor de una separación, Dios no te mira con condena — te mira con el mismo amor con que corrió hacia el hijo pródigo. Su gracia es más grande que tu fracaso más grande.',
  },
  {
    id:        '14',
    emoji:     '✝️',
    categoria: 'Jesús',
    pregunta:  '¿Jesús realmente existió históricamente?',
    intro:
      'Aunque es una pregunta que sorprende a muchos creyentes, la existencia histórica de Jesús está entre los hechos mejor documentados de la antigüedad. No solo la Biblia lo confirma.',
    puntos: [
      {
        titulo: 'Fuentes no cristianas del siglo I y II',
        texto:
          'El historiador romano Tácito (año 116 d.C.) menciona a "Cristo" ejecutado por Poncio Pilato. El historiador judío Flavio Josefo (año 93 d.C.) lo menciona dos veces. Plinio el Joven (año 112 d.C.) describe a los primeros cristianos adorando a Cristo como a un dios.',
        cita: '«Cristo, de quien toma su nombre, fue ejecutado durante el reinado de Tiberio por el procurador Poncio Pilato.»\n— Tácito, Anales XV.44',
      },
      {
        titulo: 'El consenso de los historiadores',
        texto:
          'Prácticamente todos los historiadores seculares modernos — creyentes y no creyentes — aceptan que Jesús de Nazaret existió como persona histórica en el siglo I. El debate académico no es "¿existió?" sino "¿quién fue?".',
      },
      {
        titulo: 'Las cartas de Pablo son las más antiguas',
        texto:
          'Las cartas de Pablo (escritas 15-25 años después de la crucifixión) mencionan haber conocido personalmente a Santiago, hermano de Jesús, y a Pedro. No son leyendas tardías — son documentos de primera generación.',
        cita: '«Después subí a Jerusalén para visitar a Pedro, y me quedé con él quince días. No vi a ningún otro de los apóstoles, solo a Santiago, el hermano del Señor.»\n— Gálatas 1:18-19',
      },
      {
        titulo: 'Lo que la historia no puede confirmar',
        texto:
          'La historia puede confirmar que Jesús existió, que fue bautizado por Juan, que reunió discípulos, que fue crucificado bajo Pilato y que sus seguidores creían que había resucitado. Si realmente resucitó es una pregunta de fe, no solo de historia.',
      },
    ],
    conclusion:
      'La existencia histórica de Jesús no es cuestión de debate serio entre los académicos. Fuentes romanas, judías y cristianas del siglo I y II lo confirman. La pregunta que la historia no puede resolver sola es la más importante: quién era realmente y si su resurrección fue real. Esa es la pregunta de fe.',
    mensaje:
      'La pregunta más importante no es "¿existió Jesús?" — esa está resuelta. La pregunta que cambia vidas es: "¿quién es Jesús para mí?" La historia lo confirma como persona real. La fe lo reconoce como Señor y Salvador. Esa segunda respuesta es la que Jesús mismo te pregunta hoy.',
  },
  {
    id:        '15',
    emoji:     '👦',
    categoria: 'Jesús',
    pregunta:  '¿Tuvo Jesús hermanos?',
    intro:
      'Los evangelios mencionan a "los hermanos de Jesús" varias veces. Esto plantea una pregunta importante sobre la virginidad perpetua de María y sobre la familia de Jesús.',
    puntos: [
      {
        titulo: 'Lo que dicen los evangelios',
        texto:
          'Marcos, Mateo y Juan mencionan a "los hermanos" de Jesús. Marcos incluso los nombra: Jacobo, José, Judas y Simón, y habla de "hermanas".',
        cita: '«¿No es este el carpintero, hijo de María, hermano de Jacobo, José, Judas y Simón? ¿No están sus hermanas aquí entre nosotros?»\n— Marcos 6:3',
      },
      {
        titulo: 'Posición católica: primos o medios hermanos',
        texto:
          'La Iglesia Católica sostiene la virginidad perpetua de María. Explica que en el hebreo y arameo de la época, la misma palabra ("ah") se usaba tanto para "hermano" como para "primo" o "pariente cercano". Los "hermanos de Jesús" serían primos o hijos de José de un matrimonio anterior.',
      },
      {
        titulo: 'Posición protestante: hijos de María y José',
        texto:
          'Muchas iglesias protestantes interpretan "hermanos" en sentido literal: hijos biológicos de María y José, nacidos después de Jesús. Citan Mateo 1:25 — "no la conoció hasta que dio a luz a su hijo primogénito" — como implicando que hubo hijos después.',
        cita: '«Pero no la conoció hasta que ella dio a luz a su hijo primogénito.»\n— Mateo 1:25',
      },
      {
        titulo: 'Santiago, el hermano del Señor',
        texto:
          'Lo que sí es claro es que Santiago (Jacobo) era llamado "el hermano del Señor" y se convirtió en líder de la iglesia en Jerusalén. Si era hermano literal o primo, fue una figura clave del cristianismo primitivo.',
        cita: '«¿No es este el hermano del Señor?»\n— Gálatas 1:19',
      },
    ],
    conclusion:
      'Los evangelios mencionan a los "hermanos de Jesús" en varios pasajes. Si eran hermanos biológicos, primos o hijos de un matrimonio previo de José depende de la tradición teológica. La Iglesia Católica y Ortodoxa defienden la virginidad perpetua de María; la mayoría de las iglesias protestantes los consideran hijos de María y José. Ambas posiciones tienen argumentos serios.',
    mensaje:
      'Independientemente de si eran primos o hermanos, Jesús vino a hacer de nosotros su familia. Él mismo dijo: "Mi madre y mis hermanos son los que oyen la Palabra de Dios y la ponen en práctica." La familia más importante no es la biológica — es la que se forma alrededor de Él.',
  },
  {
    id:        '16',
    emoji:     '📖',
    categoria: 'Jesús',
    pregunta:  '¿Por qué hay 4 evangelios y no uno solo?',
    intro:
      'Mateo, Marcos, Lucas y Juan cuentan la historia de Jesús desde perspectivas distintas, con diferencias entre sí. ¿Por qué cuatro versiones? ¿No generan contradicción?',
    puntos: [
      {
        titulo: 'Cuatro retratos de la misma persona',
        texto:
          'Los cuatro evangelios no son cuatro versiones contradictorias — son cuatro retratos complementarios. Mateo escribe para una audiencia judía y enfatiza el cumplimiento de las profecías. Marcos es el más breve y dinámico, escrito para romanos. Lucas es el médico griego que destaca la humanidad de Jesús y su misericordia. Juan es el más teológico y profundo.',
      },
      {
        titulo: '¿Por qué diferencias entre ellos?',
        texto:
          'Las diferencias entre los evangelios (orden de eventos, detalles distintos) se explican por sus audiencias y propósitos diferentes, no por contradicción. Ningún testigo de un evento lo cuenta exactamente igual que otro — eso no significa que mientan, sino que son testigos independientes.',
        cita: '«Muchos han intentado hacer una relación ordenada de las cosas que se han cumplido entre nosotros.»\n— Lucas 1:1',
      },
      {
        titulo: '¿Por qué no uno solo?',
        texto:
          'Un solo evangelio habría dado la impresión de una versión oficial controlada. Cuatro evangelios independientes, con sus diferencias, son en realidad evidencia de autenticidad histórica. En el tribunal, cuatro testigos que coinciden en lo esencial pero difieren en detalles menores son más creíbles que cuatro que repiten exactamente lo mismo.',
      },
      {
        titulo: 'El propósito declarado de Juan',
        texto:
          'El evangelio de Juan declara explícitamente por qué fue escrito. No para ser un registro histórico exhaustivo, sino para generar fe.',
        cita: '«Estas cosas se han escrito para que crean que Jesús es el Cristo, el Hijo de Dios, y para que, creyendo, tengan vida en su nombre.»\n— Juan 20:31',
      },
    ],
    conclusion:
      'Los cuatro evangelios son cuatro perspectivas complementarias sobre Jesús, no cuatro versiones contradictorias. Cada uno fue escrito para una audiencia específica con un énfasis teológico propio. Sus diferencias son evidencia de independencia y autenticidad — cuatro testigos distintos que coinciden en lo esencial: Jesús vivió, murió y resucitó.',
    mensaje:
      'Cuatro personas distintas, cuatro perspectivas diferentes, un solo Señor. Los evangelios nos enseñan que el encuentro con Jesús es personal y único para cada uno. Mateo lo vio de un modo, Juan de otro. ¿Cómo lo has encontrado tú? Esa es la pregunta que los cuatro evangelios te devuelven.',
  },
  {
    id:        '17',
    emoji:     '💀',
    categoria: 'El más allá',
    pregunta:  '¿Qué pasa cuando uno muere según la Biblia?',
    intro:
      'La muerte es la pregunta más universal de la humanidad. La Biblia no da una respuesta en un solo versículo — su enseñanza sobre la muerte y el más allá se desarrolla a lo largo de todo el texto.',
    puntos: [
      {
        titulo: 'El Antiguo Testamento: el Seol',
        texto:
          'En el Antiguo Testamento, los muertos van al "Seol" — un lugar de sombras donde los difuntos existen de manera disminuida. No es el infierno de castigo, sino simplemente el reino de los muertos. La esperanza de resurrección aparece pero de manera gradual.',
        cita: '«¿Acaso en la muerte se te recuerda? ¿Quién te alaba en el Seol?»\n— Salmo 6:5',
      },
      {
        titulo: 'Jesús y el paraíso inmediato',
        texto:
          'Jesús prometió al ladrón crucificado que ese mismo día estaría con él en el paraíso. Esto sugiere una presencia consciente con Dios inmediatamente después de la muerte, antes de la resurrección final.',
        cita: '«De cierto te digo que hoy estarás conmigo en el paraíso.»\n— Lucas 23:43',
      },
      {
        titulo: 'Pablo: estar con Cristo',
        texto:
          'Pablo describe la muerte como partir para estar con Cristo, algo que considera "muchísimo mejor". No describe un sueño o un estado de inconsciencia, sino una comunión con Cristo.',
        cita: '«Para mí el vivir es Cristo y el morir es ganancia... tengo el deseo de partir y estar con Cristo, que es muchísimo mejor.»\n— Filipenses 1:21-23',
      },
      {
        titulo: 'La resurrección final',
        texto:
          'La enseñanza central del Nuevo Testamento no es "el alma va al cielo para siempre" — es la resurrección del cuerpo al final de los tiempos. El cuerpo importa. El destino final del creyente es un cuerpo resucitado en una tierra renovada.',
        cita: '«El Señor mismo descenderá del cielo, y los muertos en Cristo resucitarán primero.»\n— 1 Tesalonicenses 4:16',
      },
    ],
    conclusion:
      'La Biblia enseña que al morir, el creyente entra en una comunión con Cristo (el "paraíso" de Lucas 23, el "estar con Cristo" de Pablo). Esto es el estado intermedio. Al final de los tiempos, habrá una resurrección del cuerpo y un juicio. El destino último del creyente no es un alma flotando en el cielo, sino un cuerpo resucitado en la creación renovada de Dios.',
    mensaje:
      'La muerte para el creyente no es el final — es una puerta. Pablo lo dijo sin rodeos: "Para mí el vivir es Cristo y el morir es ganancia." Si Jesús venció la muerte, entonces la muerte ya no tiene la última palabra sobre ninguno de los que están en Él. No hay nada que temer del otro lado.',
  },
  {
    id:        '18',
    emoji:     '🔥',
    categoria: 'El más allá',
    pregunta:  '¿Existe realmente el infierno?',
    intro:
      'El infierno es uno de los temas más incómodos de la Biblia. Jesús habló de él más que ningún otro autor bíblico. Pero ¿qué dice exactamente y qué tan literal debemos tomarlo?',
    puntos: [
      {
        titulo: 'Jesús habló del infierno más que nadie',
        texto:
          'Lo paradójico es que el maestro del amor y la misericordia es también quien con más frecuencia advierte sobre el juicio eterno. Jesús usó la imagen del "Gehenna" — el basurero de Jerusalén donde el fuego no se apagaba — como metáfora del destino de los que rechazan a Dios.',
        cita: '«No teman a los que matan el cuerpo pero no pueden matar el alma. Teman más bien al que puede destruir alma y cuerpo en el infierno.»\n— Mateo 10:28',
      },
      {
        titulo: '¿Fuego literal o simbólico?',
        texto:
          'Los teólogos debaten si el fuego del infierno es literal o simbólico. Curiosamente, el mismo texto describe el infierno a la vez como "fuego" y como "tinieblas exteriores" — dos imágenes incompatibles si son literales. Muchos concluyen que son metáforas de una realidad terrible que el lenguaje humano no puede describir con exactitud.',
        cita: '«Entonces dirá a los que están a su izquierda: Apártense de mí, malditos, al fuego eterno preparado para el diablo y sus ángeles.»\n— Mateo 25:41',
      },
      {
        titulo: 'Tres posiciones dentro del cristianismo',
        texto:
          'Las posiciones principales son: (1) Infierno eterno consciente — la posición tradicional católica y protestante. (2) Aniquilacionismo — los condenados son destruidos, no torturados eternamente (algunos evangélicos). (3) Universalismo — eventualmente todos serán salvados (minoritario, no es la posición oficial de ninguna iglesia principal).',
      },
      {
        titulo: 'Lo que no se puede ignorar',
        texto:
          'Independientemente de los debates sobre su naturaleza, Jesús habló del juicio eterno como una realidad seria. La separación de Dios — que es la fuente de todo bien, amor y vida — es en sí misma la mayor pérdida imaginable.',
        cita: '«Y estos irán al castigo eterno, pero los justos a la vida eterna.»\n— Mateo 25:46',
      },
    ],
    conclusion:
      'La Biblia — y especialmente Jesús — habla del infierno como una realidad seria. Su naturaleza exacta es debatida: ¿fuego literal o metafórico? ¿Eterno o con final? Lo que ninguna posición cristiana seria puede ignorar es la advertencia de Jesús: hay consecuencias eternas de las decisiones de esta vida, y la separación definitiva de Dios es la mayor tragedia posible.',
    mensaje:
      'El infierno no fue creado para los seres humanos — fue preparado para el diablo y sus ángeles. Dios no quiere que nadie vaya allí, y por eso envió a su propio Hijo. La advertencia de Jesús sobre el juicio no es para asustar — es para despertar. El mismo Jesús que habló del infierno es el que abrió la puerta del cielo.',
  },
  {
    id:        '19',
    emoji:     '🌟',
    categoria: 'El más allá',
    pregunta:  '¿Se puede saber si alguien que murió está en el cielo?',
    intro:
      'Cuando perdemos a un ser querido, la pregunta natural es: ¿dónde está ahora? ¿Está bien? La Biblia da principios claros, aunque no una respuesta definitiva sobre personas específicas.',
    puntos: [
      {
        titulo: 'Solo Dios conoce el corazón',
        texto:
          'La Biblia enseña consistentemente que el juicio final pertenece a Dios, no a los seres humanos. Solo Dios conoce el corazón de cada persona con toda profundidad — incluyendo los últimos momentos de su vida.',
        cita: '«No juzguen, para que no sean juzgados.»\n— Mateo 7:1',
      },
      {
        titulo: 'El ladrón en la cruz: esperanza para los últimos momentos',
        texto:
          'Uno de los textos más consoladores es el del ladrón crucificado junto a Jesús. No había sido bautizado, no tenía obras, no había ido a la iglesia. En sus últimos momentos se dirigió a Jesús con fe — y Jesús le prometió el paraíso. Esto da esperanza sobre lo que puede pasar en los últimos instantes de una vida.',
        cita: '«De cierto te digo que hoy estarás conmigo en el paraíso.»\n— Lucas 23:43',
      },
      {
        titulo: 'La misericordia de Dios es más grande que nuestros juicios',
        texto:
          'La Biblia describe a un Dios que no quiere que nadie perezca, que busca la oveja perdida, que corre hacia el hijo pródigo. Este Dios es perfectamente justo y perfectamente misericordioso al mismo tiempo. No podemos saber exactamente qué pasó en el corazón de alguien antes de morir.',
        cita: '«El Señor no quiere que ninguno perezca, sino que todos procedan al arrepentimiento.»\n— 2 Pedro 3:9',
      },
      {
        titulo: 'La oración por los difuntos',
        texto:
          'La Iglesia Católica y las Iglesias Ortodoxas oran por los difuntos, encomendándolos a la misericordia de Dios. Esta práctica refleja confianza en que Dios puede alcanzar a las personas incluso en el proceso de su muerte y más allá de nuestra comprensión.',
      },
    ],
    conclusion:
      'La Biblia nos prohíbe hacer juicios definitivos sobre el destino eterno de personas específicas — eso pertenece únicamente a Dios. Lo que sí nos revela es un Dios cuya misericordia es más grande de lo que podemos imaginar, que conoce cada corazón con perfecta profundidad, y que no quiere que nadie se pierda. La respuesta correcta ante la muerte de un ser querido es confiar en ese Dios, no intentar usurpar su juicio.',
    mensaje:
      'Encomienda a tus seres queridos que partieron a la misericordia de Dios. Él los conoce mejor de lo que tú los conoces, y los ama más de lo que tú puedes amarlos. La fe no te pide certezas que no tienes — te pide que descanses en Aquel que sí las tiene. Y ese Dios es bueno.',
  },
  {
    id:        '20',
    emoji:     '🙏',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Cómo tener fe y cómo aumentarla?',
    intro:
      'La fe es el corazón de la vida cristiana. Pero muchos creyentes tienen una pregunta sincera: ¿tengo poca fe, cómo la obtengo, cómo la hago crecer? La Biblia tiene respuestas concretas, no solo inspiracionales.',
    puntos: [
      {
        titulo: '¿Qué es la fe según la Biblia?',
        texto:
          'La fe no es un sentimiento de seguridad ni una emoción positiva. La Biblia la define como convicción profunda de realidades que no se ven. Es apostar la vida a que Dios es quien dice ser.',
        cita: '«La fe es la certeza de lo que se espera, la convicción de lo que no se ve.»\n— Hebreos 11:1',
      },
      {
        titulo: 'La fe viene de oír la Palabra',
        texto:
          'La ruta más directa para que la fe crezca es la más simple: escuchar y leer la Biblia. No como ejercicio intelectual, sino como alimento. Cada vez que la Palabra entra, la fe tiene más dónde crecer.',
        cita: '«La fe es por el oír, y el oír, por la palabra de Dios.»\n— Romanos 10:17',
      },
      {
        titulo: 'La fe crece en las dificultades',
        texto:
          'Paradójicamente, las pruebas no destruyen la fe — la fortalecen. La fe que solo funciona cuando todo va bien no es fe todavía. Las dificultades son el entrenamiento que convierte la creencia en convicción.',
        cita: '«Tened por sumo gozo cuando os encontréis en diversas pruebas, sabiendo que la prueba de vuestra fe produce paciencia.»\n— Santiago 1:2-3',
      },
      {
        titulo: 'La oración honesta: "¡Ayuda mi incredulidad!"',
        texto:
          'Un padre desesperado le pidió a Jesús que sanara a su hijo. Jesús le dijo que todo es posible al que cree. El hombre respondió con una de las oraciones más honestas de la Biblia: "Creo, pero ayúdame en mi poca fe." Jesús no lo rechazó — sanó a su hijo.',
        cita: '«Creo; ayuda mi incredulidad.»\n— Marcos 9:24',
      },
      {
        titulo: 'La fe se ejercita con acción',
        texto:
          'La fe no crece solo meditando — crece actuando. Cada vez que obedeces aunque no entiendes, cada vez que confías aunque tienes miedo, cada vez que das aunque te cuesta, la fe se fortalece. La inacción la atrofia.',
        cita: '«La fe sin obras está muerta.»\n— Santiago 2:17',
      },
    ],
    conclusion:
      'La fe no es un sentimiento que llega de repente ni un don que algunos tienen y otros no. Es una convicción que se alimenta con la Palabra, se prueba en las dificultades, se expresa en oración honesta y se fortalece con cada acto de obediencia. No hay atajos — pero sí hay un camino claro.',
    mensaje:
      'No esperes tener más fe para empezar a actuar. Actúa con la fe que tienes y verás cómo crece. El padre del niño enfermo tenía fe mezclada con dudas — y Jesús actuó igual. Lo que Dios pide no es fe perfecta, sino fe honesta.',
  },
  {
    id:        '21',
    emoji:     '⚖️',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Cuál es la diferencia entre pecar a sabiendas y pecar por ignorancia?',
    intro:
      '¿Tiene el mismo peso moral hacer algo malo sabiendo que está mal, que hacerlo sin saber que lo es? La Biblia tiene una respuesta sorprendentemente clara — y más matizada de lo que parece.',
    puntos: [
      {
        titulo: 'El Antiguo Testamento distinguía ambos casos',
        texto:
          'La Ley de Moisés tenía ofrendas distintas para los pecados involuntarios. Para el que pecaba "con soberbia" (a sabiendas), no había expiación disponible en el mismo nivel — era una ofensa directa contra Dios.',
        cita: '«El alma que pecare por ignorancia ofrecerá... para ser perdonada. Mas la persona que hiciera algo con soberbia, al Señor provoca; esa persona será cortada de en medio de su pueblo.»\n— Números 15:27-30',
      },
      {
        titulo: 'Jesús: la responsabilidad es proporcional al conocimiento',
        texto:
          'Jesús enseñó que quien conoce la voluntad de Dios y no la hace recibirá más corrección que quien actuó sin saber. El conocimiento trae responsabilidad. Esto no es injusto — es coherente con cualquier sistema de justicia.',
        cita: '«Aquel siervo que conociendo la voluntad de su señor, no se preparó, ni hizo conforme a su voluntad, recibirá muchos azotes. Mas el que sin conocerla hizo cosas dignas de azotes, recibirá pocos.»\n— Lucas 12:47-48',
      },
      {
        titulo: 'Santiago: saber y no hacer ya es pecado',
        texto:
          'Santiago va más lejos: el que sabe lo que debe hacer y no lo hace, comete pecado de omisión. El conocimiento nos quita la excusa de la ignorancia.',
        cita: '«Al que sabe hacer lo bueno, y no lo hace, le es pecado.»\n— Santiago 4:17',
      },
      {
        titulo: 'La ignorancia invencible vs. la ignorancia culpable',
        texto:
          'La teología moral distingue dos tipos: la ignorancia invencible (genuinamente no podías saber, no tuviste acceso a la información) reduce la culpa moral. La ignorancia culpable (no quisiste saber para no rendir cuentas) no exime — aumenta la responsabilidad.',
      },
      {
        titulo: 'La misericordia de Dios alcanza a ambos',
        texto:
          'Jesús en la cruz oró: "Padre, perdónalos, porque no saben lo que hacen." La ignorancia genuina puede ser objeto de misericordia divina. Pero no es una salida que se pueda fabricar artificialmente.',
        cita: '«Padre, perdónalos, porque no saben lo que hacen.»\n— Lucas 23:34',
      },
    ],
    conclusion:
      'Pecar a sabiendas tiene mayor peso moral que pecar por ignorancia — la Biblia lo enseña con claridad. Pero la ignorancia no elimina automáticamente la responsabilidad: depende de si fue honesta o si fue buscada para no rendir cuentas. El conocimiento de Dios y su voluntad es un don que viene con responsabilidad.',
    mensaje:
      'El conocimiento es responsabilidad. Cuanto más sabes de Dios y de su voluntad, más se te pedirá. Eso no debería asustarte — debería motivarte a actuar con lo que ya sabes hoy, sin esperar saber todo para empezar a obedecer.',
  },
  {
    id:        '22',
    emoji:     '💑',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre la unión libre?',
    intro:
      'En muchos países la mayoría de las parejas conviven antes de casarse o en lugar de casarse. ¿Qué dice la Biblia al respecto? La respuesta va más al fondo de lo que parece.',
    puntos: [
      {
        titulo: 'El diseño original: una sola carne con pacto',
        texto:
          'Desde el Génesis, la Biblia no separa la unión sexual del pacto matrimonial. "Dejará el hombre a su padre y a su madre" implica un acto público de compromiso. "Se unirá a su mujer" implica fidelidad. "Serán una sola carne" implica intimidad total. Los tres elementos van juntos.',
        cita: '«Por tanto, dejará el hombre a su padre y a su madre, y se unirá a su mujer, y serán una sola carne.»\n— Génesis 2:24',
      },
      {
        titulo: 'Hebreos 13:4 — el lecho matrimonial',
        texto:
          'El Nuevo Testamento es directo: el matrimonio es honorable y el lecho sin mancha — pero a quienes no están en ese marco les espera el juicio de Dios. La distinción bíblica no es entre parejas estables e inestables, sino entre matrimonio y todo lo demás.',
        cita: '«Honroso sea en todos el matrimonio, y el lecho sin mancilla; pero a los fornicarios y a los adúlteros los juzgará Dios.»\n— Hebreos 13:4',
      },
      {
        titulo: 'La palabra "porneia"',
        texto:
          'El Nuevo Testamento usa el término griego "porneia" para referirse a toda actividad sexual fuera del matrimonio — incluyendo la convivencia sin compromiso formal. Aparece en los evangelios, en Pablo y en el Apocalipsis como algo que el creyente debe evitar.',
        cita: '«Huyan de la inmoralidad sexual (porneia). Todos los demás pecados que una persona comete están fuera del cuerpo, pero el que peca sexualmente peca contra su propio cuerpo.»\n— 1 Corintios 6:18',
      },
      {
        titulo: 'La mujer samaritana — verdad y gracia',
        texto:
          'Jesús habló con una mujer que había tenido cinco maridos y vivía con alguien sin casarse. No la condenó — la trató con plena dignidad. Pero sí nombró la realidad tal como era. Le ofreció agua de vida. Verdad y gracia juntas: eso es el estilo de Jesús.',
        cita: '«Bien has dicho: No tengo marido; porque cinco maridos has tenido, y el que ahora tienes no es tu marido.»\n— Juan 4:17-18',
      },
    ],
    conclusion:
      'La Biblia es clara: el diseño de Dios para la unión sexual es el matrimonio — un pacto público, exclusivo y permanente. La unión libre no cumple ese estándar según la enseñanza bíblica. El tono, sin embargo, no es de condena sino de invitación: a un amor más profundo, más comprometido y más parecido al amor de Dios.',
    mensaje:
      'Dios no inventó el matrimonio para complicarte la vida — lo inventó porque sabe que el amor verdadero pide entrega total. El compromiso no limita el amor, lo libera. Cuando dices "para siempre", estás imitando la forma en que Dios te ama a ti.',
  },
  {
    id:        '23',
    emoji:     '🌍',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre las demás religiones?',
    intro:
      '¿Reconoce la Biblia otras religiones? ¿Pueden ser válidas? ¿Puede alguien salvarse fuera del cristianismo? Estas preguntas tocan uno de los debates más profundos de la fe y merecen una respuesta honesta.',
    puntos: [
      {
        titulo: 'Jesús: "Yo soy el camino"',
        texto:
          'Esta es la declaración más exclusiva de Jesús. No dice que sea uno de varios caminos posibles. Dice que nadie llega al Padre sino por Él. Esta exclusividad es parte central del mensaje cristiano — no se puede suavizar sin cambiar lo que Jesús dijo.',
        cita: '«Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.»\n— Juan 14:6',
      },
      {
        titulo: 'Hechos 4:12 — un solo nombre',
        texto:
          'Pedro ante el Sanedrín fue igualmente directo: no hay otro nombre en el cielo ni en la tierra por el cual los seres humanos puedan ser salvos. El apóstol no estaba siendo arrogante — estaba siendo fiel a lo que había visto y vivido.',
        cita: '«Y en ningún otro hay salvación; porque no hay otro nombre bajo el cielo, dado a los hombres, en que podamos ser salvos.»\n— Hechos 4:12',
      },
      {
        titulo: 'Pablo en Atenas — Dios y los que buscan',
        texto:
          'En Hechos 17, Pablo no condena a los griegos por adorar dioses distintos. Empieza reconociendo su búsqueda: "Al Dios no conocido que adoráis, yo os lo anuncio." Ve en ellos una búsqueda sincera. Dios está cerca de quienes le buscan, aunque aún no lo conozcan por nombre.',
        cita: '«Porque en él vivimos, y nos movemos, y somos; como algunos de vuestros propios poetas también han dicho: Porque linaje suyo somos.»\n— Hechos 17:28',
      },
      {
        titulo: 'Romanos 2 — la ley escrita en el corazón',
        texto:
          'Pablo enseña que personas que nunca oyeron el Evangelio tienen la ley moral escrita en el corazón. Esto abre espacio teológico para pensar en cómo Dios puede alcanzar a quienes genuinamente no tuvieron acceso a Cristo — sin cancelar la exclusividad de la salvación en Él.',
        cita: '«Porque cuando los gentiles que no tienen ley, hacen por naturaleza lo que es de la ley... mostrando la obra de la ley escrita en sus corazones.»\n— Romanos 2:14-15',
      },
    ],
    conclusion:
      'La Biblia afirma que Jesús es el único camino al Padre — eso es central al cristianismo y no puede suavizarse. Pero también muestra un Dios que ve la búsqueda sincera del corazón humano. Los límites exactos de la salvación los pone Dios, no nosotros. Lo que sí es claro es que el cristiano está llamado a compartir esa fe con amor y respeto, no con arrogancia ni desprecio.',
    mensaje:
      'La exclusividad de Cristo no es arrogancia — es el amor de Dios que no quiso dejarnos con un mapa incompleto. Él no dijo "hay muchos caminos y espero que encuentres uno." Dijo "Yo soy el camino" — y vino personalmente a buscarte.',
  },
  {
    id:        '24',
    emoji:     '⛪',
    categoria: 'Jesús',
    pregunta:  '¿Cómo saber que la religión católica es la correcta?',
    intro:
      'En un mundo con miles de denominaciones y religiones, ¿cómo puede alguien saber cuál es la verdadera? Esta pregunta merece una respuesta seria, histórica y bíblica — no solo emocional.',
    puntos: [
      {
        titulo: 'Jesús fundó una Iglesia con liderazgo visible',
        texto:
          'Jesús no solo dejó un libro — fundó una comunidad con estructura de liderazgo visible. Eligió a los doce apóstoles, y a Pedro le dio un papel especial. La Iglesia Católica reclama ser esa comunidad por continuidad directa e ininterrumpida con Pedro.',
        cita: '«Y yo también te digo, que tú eres Pedro, y sobre esta roca edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella.»\n— Mateo 16:18',
      },
      {
        titulo: 'La sucesión apostólica',
        texto:
          'La Iglesia Católica puede trazar una línea ininterrumpida de obispos desde los apóstoles hasta hoy. Ninguna iglesia protestante puede hacerlo — todas tienen una fecha de fundación en los siglos XVI al XX. Lutero en 1517, Calvino en 1536, Wesley en 1738. La continuidad histórica es un argumento poderoso.',
      },
      {
        titulo: 'Juan 6 — la Eucaristía como criterio',
        texto:
          'Jesús dijo "mi carne es verdadera comida y mi sangre es verdadera bebida" en Juan 6. Los primeros cristianos creían en la presencia real de Cristo en la Eucaristía — Ignacio de Antioquía (año 107) y Justino Mártir (año 150) lo confirman. La Iglesia Católica preservó esa fe sin interrupción.',
        cita: '«El que come mi carne y bebe mi sangre, en mí permanece, y yo en él.»\n— Juan 6:56',
      },
      {
        titulo: 'La Biblia existe gracias a la Iglesia Católica',
        texto:
          'El canon bíblico — qué libros están en la Biblia y cuáles no — fue definido por concilios de la Iglesia Católica en los siglos IV y V (Hipona 393, Cartago 397). Quienes usan solo la Biblia para rechazar a la Iglesia Católica están usando un libro que esa misma Iglesia compiló y canonizó.',
      },
      {
        titulo: 'No es solo institución — es encuentro personal',
        texto:
          'Al final, ningún argumento histórico o bíblico puede reemplazar el encuentro personal con Cristo dentro de la Iglesia. La pregunta no es solo "¿cuál es verdadera?" sino "¿dónde encuentro a Dios vivo en mi vida?" La fe nace cuando los argumentos se convierten en experiencia.',
        cita: '«Venid y ved.»\n— Juan 1:39',
      },
    ],
    conclusion:
      'La Iglesia Católica tiene argumentos históricos, bíblicos y teológicos sólidos para su reclamo de continuidad con la Iglesia fundada por Cristo. La sucesión apostólica, la Eucaristía y la canonización de la Biblia son los pilares más fuertes. Pero la fe no se agota en argumentos — culmina en un encuentro personal con Cristo.',
    mensaje:
      'La fe no es el resultado de ganar un debate — es el resultado de encontrarte con Cristo. La Iglesia Católica es la más antigua, la más documentada y la más extendida de la historia. Pero lo más importante no es tener razón sobre la institución — es conocer al Señor que la fundó y que te busca a ti.',
  },
  {
    id:        '25',
    emoji:     '📿',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Qué dice la Biblia sobre repetir oraciones como el rosario?',
    intro:
      'Una crítica frecuente al rosario es que viola Mateo 6:7, donde Jesús habla de no usar vanas repeticiones. Pero leer el texto completo — y ver cómo ora la Biblia misma — cambia completamente la imagen.',
    puntos: [
      {
        titulo: 'El versículo que se cita — en su contexto exacto',
        texto:
          'Mateo 6:7 dice: "No uséis vanas repeticiones, como los gentiles, que piensan que por su mucha palabrería serán oídos." La palabra griega es "battalogeo" — repetir palabras sin sentido, como un mantra mágico para manipular a un dios. El problema no es la repetición — es la vaciedad. "Vana" es la palabra decisiva.',
        cita: '«Y orando, no uséis vanas repeticiones, como los gentiles, que piensan que por su mucha palabrería serán oídos.»\n— Mateo 6:7',
      },
      {
        titulo: 'Jesús mismo repitió sus oraciones',
        texto:
          'En Getsemaní, la noche antes de su muerte, Jesús oró y fue a ver a sus discípulos, volvió a orar, y luego fue otra vez por tercera vez "diciendo las mismas palabras". Si repetir oraciones fuera pecado, Jesús habría pecado en el momento más sagrado de su vida.',
        cita: '«Y dejándolos, se fue de nuevo y oró por tercera vez, diciendo las mismas palabras.»\n— Mateo 26:44',
      },
      {
        titulo: 'Los Salmos están llenos de repetición',
        texto:
          'El Salmo 136 repite la frase "porque para siempre es su misericordia" exactamente 26 veces — una por cada versículo. El Salmo 150 es una letanía repetida de alabanzas. La repetición litúrgica y orante es un patrón profundamente bíblico, no una práctica pagana.',
        cita: '«Alabad al Señor, porque él es bueno; porque para siempre es su misericordia.»\n— Salmo 136:1',
      },
      {
        titulo: 'El Apocalipsis — repetición eterna ante el trono',
        texto:
          'En Apocalipsis 4:8, los cuatro seres vivientes alrededor del trono de Dios "no cesaban de decir día y noche: Santo, santo, santo es el Señor Dios Todopoderoso." La repetición incesante no es vaciedad — en ese contexto es la forma más elevada de adoración.',
        cita: '«Y los cuatro seres vivientes... no cesaban de decir: Santo, santo, santo es el Señor Dios Todopoderoso.»\n— Apocalipsis 4:8',
      },
      {
        titulo: 'El rosario — meditación con texto bíblico',
        texto:
          'El Ave María está tomada directamente de la Biblia: el saludo del ángel (Lucas 1:28) y las palabras de Isabel (Lucas 1:42). El rosario no es adorar a María — es meditar en los misterios de la vida de Cristo mientras se repite una oración bíblica. La repetición es el ritmo que libera la mente para meditar.',
        cita: '«Alégrate, muy favorecida, el Señor es contigo.»\n— Lucas 1:28',
      },
    ],
    conclusion:
      'La Biblia prohíbe las "vanas repeticiones" — palabras vacías sin fe ni sentido. No prohíbe la repetición orante. El mismo Jesús repitió sus oraciones. Los Salmos repiten frases decenas de veces. El Apocalipsis muestra seres celestiales que repiten sin cesar. Lo que importa no es cuántas veces se dice algo, sino si el corazón está presente y la oración tiene contenido real.',
    mensaje:
      'La oración no se mide en palabras originales — se mide en corazón presente. Puedes repetir "te amo" a Dios mil veces y cada vez ser más verdad. La vaciedad no está en la repetición — está en la ausencia de fe. Cuando el corazón está vuelto hacia Dios, incluso la oración más sencilla y repetida es profunda.',
  },
  {
    id:        '26',
    emoji:     '🙌',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Por qué la Iglesia pide dinero en misa y qué dice la Biblia?',
    intro:
      'A muchas personas les incomoda la colecta durante la misa. Algunos la ven como negocio. La Biblia tiene mucho que decir sobre la ofrenda — y casi nada de lo que dice se parece a lo que la cultura popular imagina.',
    puntos: [
      {
        titulo: 'El diezmo en el Antiguo Testamento',
        texto:
          'La práctica de dar a Dios una porción de los ingresos viene del Antiguo Testamento. El diezmo — el 10% — sostenía el Templo, los sacerdotes y a los pobres. No era un impuesto religioso arbitrario — era un acto de adoración que reconocía que todo proviene de Dios.',
        cita: '«Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto.»\n— Malaquías 3:10',
      },
      {
        titulo: '2 Corintios 9 — la actitud que importa',
        texto:
          'El Nuevo Testamento no fija un porcentaje obligatorio. Lo que sí fija es la actitud: dar voluntariamente, con alegría y sin presión. "Dios ama al dador alegre" es el principio central. La ofrenda forzada o resentida pierde su sentido de adoración.',
        cita: '«Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.»\n— 2 Corintios 9:7',
      },
      {
        titulo: 'La ofrenda sostenía a la comunidad',
        texto:
          'En la iglesia primitiva, la práctica era radical: vendían sus propiedades y compartían con todos según la necesidad. La ofrenda sostenía a los pobres, a los ministros que predicaban y al culto. Era economía comunitaria fundada en la generosidad, no recaudación institucional.',
        cita: '«No había entre ellos ningún necesitado... lo ponían a los pies de los apóstoles, y se repartía a cada uno según su necesidad.»\n— Hechos 4:34-35',
      },
      {
        titulo: 'La crítica legítima que la Biblia también hace',
        texto:
          'La Biblia condena enérgicamente el mal uso del dinero sagrado. Malaquías condena a los sacerdotes que se quedaban con lo mejor. Jesús expulsó a los comerciantes del Templo. La crítica al enriquecimiento personal a costa de las ofrendas tiene base bíblica sólida — y la Iglesia debe rendir cuentas de lo que recibe.',
        cita: '«Y les dijo: Escrito está: Mi casa, casa de oración será llamada; mas vosotros la habéis hecho cueva de ladrones.»\n— Mateo 21:13',
      },
      {
        titulo: 'El principio más profundo: todo es de Dios',
        texto:
          'David, al recibir ofrendas para el Templo, oró: "¿Quiénes somos nosotros para poder ofrecer voluntariamente cosas semejantes? Tuyo es todo, y de lo recibido de tu mano te damos." La ofrenda no es darle a Dios algo que le falta — es reconocer que todo lo que tienes viene de Él.',
        cita: '«Tuyo es todo, y de lo recibido de tu mano te damos.»\n— 1 Crónicas 29:14',
      },
    ],
    conclusion:
      'La Biblia sustenta la ofrenda como práctica de adoración, sostenimiento comunitario y reconocimiento de que todo viene de Dios. No como obligación bajo presión, sino como decisión libre y alegre. La crítica válida no es que la Iglesia pida — sino exigir que lo recibido se use para lo que la Biblia manda: sostener el culto, pagar justamente a los ministros y servir a los pobres.',
    mensaje:
      'Cuando das con alegría, no estás perdiendo algo — estás practicando la mayor libertad posible: la libertad de no estar atado a lo material. El dador alegre no es el que tiene más, sino el que confía más. Dar es un acto de fe: creer que Dios proveerá lo que necesitas aunque hayas dado lo que tenías.',
  },
  {
    id:        '27',
    emoji:     '🔗',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Heredamos los pecados de generaciones pasadas?',
    intro:
      'Hay versículos que parecen decir que sí, y versículos que parecen decir que no. La tensión entre Éxodo 20:5 y Ezequiel 18:20 ha desconcertado a lectores durante siglos. La respuesta depende de una distinción crucial que la misma Biblia hace.',
    puntos: [
      {
        titulo: 'El versículo que asusta — Éxodo 20:5',
        texto:
          'Cuando Dios dio los Diez Mandamientos, añadió que visitará la maldad de los padres sobre los hijos hasta la tercera y cuarta generación. Suena a que los hijos pagan por los pecados del padre. Pero el mismo contexto dice "de los que me aborrecen" — es decir, de los que continúan el camino del padre, no de cualquier descendiente.',
        cita: '«...visitando la maldad de los padres sobre los hijos hasta la tercera y cuarta generación de los que me aborrecen.»\n— Éxodo 20:5',
      },
      {
        titulo: 'Ezequiel lo aclara con fuerza',
        texto:
          'Ezequiel 18 es uno de los capítulos más explícitos sobre la responsabilidad moral individual. Dios dice claramente que el hijo no cargará con la iniquidad del padre, ni el padre con la del hijo. Cada persona responde por sus propias acciones.',
        cita: '«El alma que pecare, esa morirá; el hijo no llevará el pecado del padre, ni el padre llevará el pecado del hijo.»\n— Ezequiel 18:20',
      },
      {
        titulo: 'Jesús habló directamente del tema',
        texto:
          'Cuando los discípulos vieron a un ciego de nacimiento le preguntaron: ¿quién pecó, él o sus padres? Jesús rechazó ambas opciones. La condición de ese hombre no era castigo por pecados de generaciones anteriores — era una oportunidad para que se manifestara la obra de Dios.',
        cita: '«No es que pecó éste, ni sus padres, sino para que las obras de Dios se manifiesten en él.»\n— Juan 9:3',
      },
      {
        titulo: 'Lo que sí heredamos — el pecado original',
        texto:
          'La Biblia sí enseña que heredamos algo de Adán: no la culpa de su acto específico, sino una naturaleza humana herida. Somos propensos al error, débiles para el bien, inclinados al mal. Eso no es castigo — es la condición en que nacemos todos, y de la cual Cristo vino a liberarnos.',
        cita: '«Por tanto, así como el pecado entró en el mundo por un hombre... la muerte pasó a todos los hombres, por cuanto todos pecaron.»\n— Romanos 5:12',
      },
      {
        titulo: 'La distinción clave: consecuencias vs. culpa',
        texto:
          'Hay una diferencia importante entre heredar las consecuencias de los pecados de tus padres (patrones de conducta, traumas, vulnerabilidades emocionales) y cargar con la culpa moral de lo que ellos hicieron. Lo primero es real y hay que trabajarlo. Lo segundo no existe — Dios juzga a cada persona por sus propias acciones.',
      },
    ],
    conclusion:
      'La Biblia distingue claramente entre consecuencias heredadas y culpa heredada. Heredamos una naturaleza humana inclinada al mal (pecado original) y podemos cargar con consecuencias de patrones familiares. Pero Dios juzga a cada persona por sus propias obras — no por las de sus padres. Ezequiel 18 y Juan 9 lo dejan sin ambigüedad.',
    mensaje:
      'No cargas el peso de lo que hicieron tus padres o abuelos. Su culpa es de ellos; la tuya es tuya. Pero más importante aún: en Cristo, incluso lo tuyo puede ser limpiado. No hay cadena generacional que la gracia de Dios no pueda romper. Si hay patrones dañinos en tu familia, el ciclo puede terminar contigo.',
  },
  {
    id:        '28',
    emoji:     '📉',
    categoria: 'Fe y vida cotidiana',
    pregunta:  '¿Dice la Biblia que el mundo se iría degradando moralmente?',
    intro:
      'Antes ciertas cosas eran consideradas graves y hoy se normalizan. ¿Hay algo en la Biblia sobre esta progresiva inversión de valores? La respuesta es sí — y es sorprendentemente específica.',
    puntos: [
      {
        titulo: '2 Timoteo 3 — el diagnóstico más detallado',
        texto:
          'Pablo describe los "tiempos peligrosos" de los últimos días con una lista que suena asombrosamente contemporánea: amadores de sí mismos, amadores del dinero, jactanciosos, soberbios, desobedientes a los padres, ingratos, impíos, sin amor natural. Y añade algo clave: tendrán apariencia de piedad, pero negarán la eficacia de ella.',
        cita: '«En los postreros días vendrán tiempos peligrosos. Porque habrá hombres amadores de sí mismos... tendrán apariencia de piedad, pero negarán la eficacia de ella.»\n— 2 Timoteo 3:1-5',
      },
      {
        titulo: 'Romanos 1 — el mecanismo de la degradación',
        texto:
          'Pablo no solo describe el fenómeno, sino el proceso: cuando la humanidad rechazó a Dios y cambió la verdad por la mentira, Dios los entregó a la degradación de sus propios deseos. La degradación moral no es solo un problema cultural — es la consecuencia de alejar a Dios del centro de la vida.',
        cita: '«Y como ellos no aprobaron tener en cuenta a Dios, Dios los entregó a una mente reprobada, para hacer cosas que no convienen.»\n— Romanos 1:28',
      },
      {
        titulo: 'Isaías 5:20 — llamar bien al mal',
        texto:
          'Isaías describe algo que resuena con fuerza hoy: el momento en que una cultura invierte los valores y llama al mal bien y al bien mal. No es solo que el mal existe — es que se celebra y se institucionaliza, y quien señala que es mal queda como el problema.',
        cita: '«¡Ay de los que llaman al mal bien, y al bien mal; que hacen de la luz tinieblas, y de las tinieblas luz!»\n— Isaías 5:20',
      },
      {
        titulo: 'Jesús lo anticipó',
        texto:
          'Jesús mismo dijo que en los últimos tiempos, por el aumento de la maldad, el amor de muchos se enfriaría. No como fatalismo, sino como descripción honesta del mundo sin Dios en el centro. Y a pesar de eso, añadió que el que persevere hasta el fin será salvo.',
        cita: '«Y por haberse multiplicado la maldad, el amor de muchos se enfriará. Mas el que persevere hasta el fin, este será salvo.»\n— Mateo 24:12-13',
      },
      {
        titulo: 'La respuesta: no juzgar, sino ser diferente',
        texto:
          'La Biblia no llama al creyente a indignarse ni a condenar al mundo. Lo llama a ser sal y luz. Sal que no se ha vuelto insípida. Luz que alumbra en la oscuridad. La forma de responder a la degradación moral no es la queja — es la vida distinta.',
        cita: '«Ustedes son la sal de la tierra... Ustedes son la luz del mundo.»\n— Mateo 5:13-14',
      },
    ],
    conclusion:
      'La Biblia sí describe una degradación moral progresiva, especialmente en los textos proféticos y en las cartas de Pablo. No es pesimismo — es diagnóstico. Y el diagnóstico tiene también el remedio: el que permanece en Cristo no es arrastrado por esa corriente. El mundo se puede estar oscureciendo; eso solo hace más necesaria la luz.',
    mensaje:
      'Vivir en un mundo que cambia sus valores no te hace obsoleto — te hace necesario. La sal no se queja del podrido; lo preserva. La luz no lamenta la oscuridad; la ilumina. Si el mundo se degrada moralmente, la pregunta no es "¿qué está pasando?" sino "¿cómo vivo yo diferente?"',
  },
  {
    id:        '29',
    emoji:     '💬',
    categoria: 'Sacramentos',
    pregunta:  '¿Qué dice la Biblia sobre confesarse con un sacerdote?',
    intro:
      'La confesión sacramental es una de las prácticas más incomprendidas del catolicismo. ¿Tiene base bíblica? ¿Puede un sacerdote perdonar pecados? ¿Por qué no confesarse directamente con Dios? Las respuestas dependen de varios textos que vale conocer.',
    puntos: [
      {
        titulo: 'Jesús dio el poder de perdonar a los apóstoles',
        texto:
          'La noche de la resurrección, Jesús se apareció a los apóstoles, sopló sobre ellos y les dijo: "Recibid el Espíritu Santo. A quienes perdonéis los pecados, les serán perdonados." Este texto es la base bíblica directa del sacramento: no es el sacerdote el que perdona por su propia autoridad, sino en nombre de Cristo.',
        cita: '«Recibid el Espíritu Santo. A quienes remitiereis los pecados, les son remitidos; y a quienes se los retuviereis, les son retenidos.»\n— Juan 20:22-23',
      },
      {
        titulo: 'Santiago: "Confesaos unos a otros"',
        texto:
          'Santiago 5:16 habla de confesar los pecados unos a otros en el contexto de oración por la sanación. Es la práctica de confesar ante otro ser humano — no solo internamente ante Dios. Esto muestra que la dimensión comunitaria de la confesión tiene base bíblica.',
        cita: '«Confesaos vuestras ofensas unos a otros, y orad unos por otros, para que seáis sanados.»\n— Santiago 5:16',
      },
      {
        titulo: 'El sacerdocio como instrumento de reconciliación',
        texto:
          'En el Antiguo Testamento, la expiación por los pecados se realizaba mediante sacrificios ante el sacerdote. El Nuevo Testamento afirma que Cristo es el Sumo Sacerdote definitivo, y que los ministros de la Iglesia participan de ese ministerio de reconciliación en su nombre.',
        cita: '«Porque no tenemos un Sumo Sacerdote que no pueda compadecerse de nuestras debilidades.»\n— Hebreos 4:15',
      },
      {
        titulo: 'David se confesó directamente con Dios',
        texto:
          'El Salmo 51 es la confesión directa de David a Dios tras su pecado. No hay sacerdote en ese texto. La confesión personal y directa con Dios es bíblica, poderosa y válida. La Iglesia Católica también la enseña — la confesión sacramental no la reemplaza sino que la complementa con la certeza del perdón declarado.',
        cita: '«Contra ti, contra ti solo he pecado, y he hecho lo malo delante de tus ojos.»\n— Salmo 51:4',
      },
      {
        titulo: 'El valor de escuchar el perdón dicho en voz alta',
        texto:
          'El ser humano no solo necesita saber que Dios perdona — a veces necesita escucharlo dicho con palabras claras. La confesión sacramental no añade nada al perdón de Dios, pero lo hace audible y concreto. "Tus pecados te son perdonados" — Jesús lo dijo en voz alta a las personas que lo necesitaban.',
        cita: '«Entonces Jesús le dijo: Tus pecados te son perdonados.»\n— Lucas 7:48',
      },
    ],
    conclusion:
      'La confesión sacramental tiene base bíblica sólida: Juan 20:22-23 da el poder de perdonar directamente a los apóstoles; Santiago 5:16 habla de confesar ante otros; el sacerdocio del AT prefigura el ministerio cristiano. La confesión directa a Dios (Sal 51) también es bíblica. Las dos coexisten; la sacramental añade la certeza de escuchar el perdón declarado en nombre de Cristo.',
    mensaje:
      'Dios perdonó a David cuando confesó en soledad. Jesús perdonó a la mujer en público. El arrepentimiento sincero nunca queda sin respuesta, sin importar dónde ni cómo se haga. Si dudas sobre la confesión, recuerda: lo que importa no es el método — es el corazón que se vuelve a Dios con verdad.',
  },
]

function buildTexto(p: Pregunta): string {
  const partes: string[] = [p.pregunta, '. ', p.intro]
  p.puntos.forEach((pt, i) => {
    partes.push(` Punto ${i + 1}: ${pt.titulo}. ${pt.texto}`)
    if (pt.cita) {
      // quitar el guión de referencia (— Libro X:Y) para que suene natural
      const soloTexto = pt.cita.split('\n')[0].replace(/[«»]/g, '')
      partes.push(` ${soloTexto}`)
    }
  })
  partes.push(` En resumen: ${p.conclusion}`)
  partes.push(` El verdadero mensaje: ${p.mensaje}`)
  return partes.join('')
}

export default function PreguntasScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [abierto, setAbierto] = useState<string | null>(null)
  const [leyendo, setLeyendo] = useState<string | null>(null)

  useEffect(() => () => { Speech.stop() }, [])

  const toggle = (id: string) => {
    if (abierto === id) {
      Speech.stop()
      setLeyendo(null)
    }
    setAbierto(prev => (prev === id ? null : id))
  }

  const escuchar = (p: Pregunta) => {
    if (leyendo === p.id) {
      Speech.stop()
      setLeyendo(null)
      return
    }
    Speech.stop()
    setLeyendo(p.id)
    Speech.speak(buildTexto(p), {
      language: 'es-ES',
      rate: 0.9,
      onDone:  () => setLeyendo(null),
      onError: () => setLeyendo(null),
    })
  }

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

                  {/* Botón audio */}
                  <TouchableOpacity
                    style={[s.audioBtn, leyendo === p.id && s.audioBtnActivo]}
                    onPress={() => escuchar(p)}
                    activeOpacity={0.8}
                  >
                    <Text style={s.audioBtnIcon}>{leyendo === p.id ? '⏹' : '🔊'}</Text>
                    <Text style={[s.audioBtnTxt, leyendo === p.id && s.audioBtnTxtActivo]}>
                      {leyendo === p.id ? 'Detener audio' : 'Escuchar respuesta'}
                    </Text>
                  </TouchableOpacity>

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

                  {/* Mensaje verdadero */}
                  <View style={s.mensajeBox}>
                    <Text style={s.mensajeLabel}>✝ El verdadero mensaje</Text>
                    <Text style={s.mensajeTxt}>{p.mensaje}</Text>
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
  audioBtn:       { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#0f2d1a', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 14, borderWidth: 1, borderColor: '#166534' },
  audioBtnActivo: { backgroundColor: '#1a0a0a', borderColor: '#991b1b' },
  audioBtnIcon:   { fontSize: 16 },
  audioBtnTxt:    { color: '#4ade80', fontSize: 14, fontWeight: '600' },
  audioBtnTxtActivo: { color: '#f87171' },
  introTxt:       { color: C.sub, fontSize: 14, lineHeight: 21, marginBottom: 16, fontStyle: 'italic' },

  punto:          { marginBottom: 16 },
  puntoTitulo:    { color: C.acento, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  puntoTexto:     { color: C.texto, fontSize: 14, lineHeight: 22 },
  citaBox:        { backgroundColor: '#1c1917', borderLeftWidth: 3, borderLeftColor: C.acento, borderRadius: 8, padding: 12, marginTop: 8 },
  citaTxt:        { color: '#fde68a', fontSize: 13, lineHeight: 20, fontStyle: 'italic' },

  conclusionBox:  { backgroundColor: '#1c1412', borderRadius: 12, padding: 14, marginTop: 4, borderWidth: 1, borderColor: C.bgLight },
  conclusionLabel:{ color: C.acento, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  conclusionTxt:  { color: C.texto, fontSize: 14, lineHeight: 21 },

  mensajeBox:    { backgroundColor: '#0f172a', borderRadius: 12, padding: 14, marginTop: 10, borderWidth: 1, borderColor: '#4338ca', borderLeftWidth: 4 },
  mensajeLabel:  { color: '#a5b4fc', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  mensajeTxt:    { color: '#e0e7ff', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },

  nota:           { color: C.sub, fontSize: 13, textAlign: 'center', marginTop: 8, marginBottom: 4 },
})
