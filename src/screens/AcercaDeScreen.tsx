import React from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Share,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const PAGINA_DESCARGA = 'https://pos-one-backend.onrender.com/biblia/'

async function compartirPorWhatsapp() {
  await Share.share({
    message:
      '✝ *Palabra Viva* — Dios Habla Hoy\n\n' +
      'Te comparto esta app gratuita para Android con la Biblia completa:\n' +
      '📖 75 libros completos\n' +
      '🔊 Audio gratis sin internet\n' +
      '✨ Rutas temáticas y guías espirituales\n\n' +
      `Descárgala aquí (con instrucciones):\n${PAGINA_DESCARGA}`,
  })
}

const C = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#818cf8', borde: '#334155' }


export default function AcercaDeScreen() {
  const nav    = useNavigation<any>()
  const insets = useSafeAreaInsets()

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondo} />

      <View style={[s.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => nav.goBack()} style={s.backBtn}>
          <Text style={s.backTxt}>‹ Inicio</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>Acerca de esta app</Text>
      </View>

      <ScrollView contentContainerStyle={[s.lista, { paddingBottom: insets.bottom + 24 }]}>

        {/* Versión */}
        <View style={s.heroBox}>
          <Text style={s.heroEmoji}>✝</Text>
          <Text style={s.heroTitulo}>Palabra Viva</Text>
          <Text style={s.heroVersion}>Versión 1.7.0  •  DHH Edición Internacional</Text>
        </View>

        {/* Traducción */}
        <Text style={s.seccion}>📖  Traducción bíblica</Text>
        <View style={s.card}>
          <Text style={s.cardTitulo}>Dios Habla Hoy (DHH)</Text>
          <Text style={s.cardTexto}>
            La <Text style={s.bold}>Dios Habla Hoy</Text> es una traducción en lenguaje contemporáneo publicada por las
            <Text style={s.bold}> Sociedades Bíblicas Unidas</Text>. Es ampliamente utilizada por comunidades
            católicas de habla hispana en toda América Latina.
          </Text>
        </View>

        {/* Contenido */}
        <Text style={s.seccion}>🗂  Contenido de la app</Text>
        <View style={s.card}>
          {[
            ['66', 'libros completos'],
            ['39', 'del Antiguo Testamento'],
            ['27', 'del Nuevo Testamento'],
            ['35,887', 'versículos en total'],
            ['16', 'rutas temáticas'],
            ['18', 'guías por estado emocional'],
          ].map(([num, desc]) => (
            <View key={num + desc} style={s.statRow}>
              <Text style={s.statNum}>{num}</Text>
              <Text style={s.statDesc}>{desc}</Text>
            </View>
          ))}
        </View>

        {/* Fuente de datos */}
        <Text style={s.seccion}>🛠  Fuente de datos</Text>
        <View style={s.card}>
          <Text style={s.cardTexto}>
            Los textos bíblicos fueron procesados a partir de datos estructurados del proyecto
            <Text style={s.bold}> bible-data-es-spa</Text> disponible en GitHub bajo licencia MIT,
            y convertidos a una base de datos SQLite local para funcionamiento sin conexión a internet.
          </Text>
          <Text style={[s.cardTexto, { marginTop: 10, color: C.subTexto, fontSize: 12 }]}>
            Los derechos de la traducción DHH pertenecen a las Sociedades Bíblicas Unidas.
            Esta aplicación es de uso personal y no se distribuye comercialmente.
          </Text>
        </View>

        {/* Funcionamiento offline */}
        <Text style={s.seccion}>📴  Sin conexión a internet</Text>
        <View style={s.card}>
          <Text style={s.cardTexto}>
            La Biblia completa está almacenada en el dispositivo. No necesitas internet para
            leer, escuchar o buscar versículos. La app funciona completamente offline.
          </Text>
        </View>

        {/* Compartir */}
        <TouchableOpacity style={s.shareBtn} onPress={compartirPorWhatsapp} activeOpacity={0.8}>
          <Text style={s.shareIcon}>📤</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.shareTitulo}>Compartir con un amigo</Text>
            <Text style={s.shareSub}>Enviar el enlace de descarga por WhatsApp u otra app</Text>
          </View>
          <Text style={s.shareFlecha}>›</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container:   { flex: 1, backgroundColor: C.fondo },
  header:      { paddingBottom: 16, paddingHorizontal: 20 },
  backBtn:     { marginBottom: 8 },
  backTxt:     { color: C.acento, fontSize: 16 },
  titulo:      { fontSize: 26, fontWeight: '700', color: C.texto },
  lista:       { paddingHorizontal: 16, paddingTop: 8, gap: 12 },
  heroBox:     { backgroundColor: '#1e1b4b', borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 4 },
  heroEmoji:   { fontSize: 40, color: C.acento, marginBottom: 8 },
  heroTitulo:  { fontSize: 22, fontWeight: '700', color: C.texto },
  heroVersion: { color: C.subTexto, fontSize: 13, marginTop: 4 },
  seccion:     { fontSize: 12, fontWeight: '700', color: C.subTexto, textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 },
  card:        { backgroundColor: C.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.borde },
  cardTitulo:  { color: C.acento, fontSize: 15, fontWeight: '700', marginBottom: 8 },
  cardTexto:   { color: C.texto, fontSize: 14, lineHeight: 21 },
  bold:        { fontWeight: '700', color: '#c7d2fe' },
  statRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6, borderBottomWidth: 1, borderColor: C.borde },
  statNum:     { color: C.acento, fontSize: 18, fontWeight: '700', minWidth: 52, textAlign: 'right' },
  statDesc:    { color: C.texto, fontSize: 14, flex: 1 },
  dcRow:       { gap: 3 },
  dcLibro:     { color: '#c4b5fd', fontSize: 14, fontWeight: '700' },
  dcDesc:      { color: C.subTexto, fontSize: 13, lineHeight: 18 },
  shareBtn:    { backgroundColor: '#064e3b', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#065f46' },
  shareIcon:   { fontSize: 24 },
  shareTitulo: { color: '#6ee7b7', fontWeight: '700', fontSize: 15 },
  shareSub:    { color: '#34d399', fontSize: 12, marginTop: 2 },
  shareFlecha: { color: '#6ee7b7', fontSize: 24 },
})
