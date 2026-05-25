import React, { useEffect, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, TextInput, StatusBar, Share, Modal, Linking,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLibros, Libro } from '../db/database'
import { useProgress } from '../hooks/useProgress'

const COLORES = { fondo: '#0f172a', card: '#1e293b', texto: '#f1f5f9', subTexto: '#94a3b8', acento: '#818cf8', borde: '#334155' }
const BASE_URL = 'https://pos-one-backend.onrender.com/api/biblia-app'
const PAGINA_URL = 'https://pos-one-backend.onrender.com/biblia'
const INSTALL_KEY = 'biblia_install_registered'
const CURRENT_VERSION = 'v1.4.1'
const GITHUB_RELEASES_API = 'https://api.github.com/repos/kacheablecr-jpg/biblia-katolica-app/releases/latest'
const DOWNLOAD_URL = 'https://github.com/kacheablecr-jpg/biblia-katolica-app/releases/latest/download/palabra-viva.apk'

async function compartir() {
  await Share.share({
    message:
      '✝ *Palabra Viva* — Dios Habla Hoy\n\n' +
      'Te comparto esta app gratuita para Android con la Biblia completa:\n' +
      '📖 66 libros completos\n' +
      '🔊 Audio gratis sin internet\n' +
      '✨ Rutas temáticas y guías espirituales\n\n' +
      `Descárgala aquí (con instrucciones):\n${PAGINA_URL}`,
  })
}

export default function HomeScreen() {
  const nav = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [libros, setLibros] = useState<Libro[]>([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [progreso, setProgreso] = useState<{ lectura?: any; audio?: any }>({})
  const [stats, setStats] = useState<{ downloads: number; installs: number } | null>(null)
  const [showUpdate, setShowUpdate] = useState(false)
  const { obtener } = useProgress()

  useEffect(() => {
    getLibros().then(data => { setLibros(data); setLoading(false) })
    Promise.all([obtener('lectura'), obtener('audio')]).then(([l, a]) => {
      setProgreso({ lectura: l, audio: a })
    })
    fetch(`${BASE_URL}/stats`)
      .then(r => r.json())
      .then(d => { if (d.downloads > 0 || d.installs > 0) setStats(d) })
      .catch(() => undefined)
    AsyncStorage.getItem(INSTALL_KEY).then(val => {
      if (!val) {
        fetch(`${BASE_URL}/install`, { method: 'POST' })
          .then(() => AsyncStorage.setItem(INSTALL_KEY, '1'))
          .catch(() => undefined)
      }
    })
    fetch(GITHUB_RELEASES_API)
      .then(r => r.json())
      .then(d => { if (d.tag_name && d.tag_name !== CURRENT_VERSION) setShowUpdate(true) })
      .catch(() => undefined)
  }, [])

  const librosFiltrados = libros.filter(l =>
    l.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
  const at = librosFiltrados.filter(l => l.testamento === 'AT')
  const nt = librosFiltrados.filter(l => l.testamento === 'NT')

  const renderLibro = ({ item }: { item: Libro }) => (
    <TouchableOpacity
      style={s.card}
      onPress={() => nav.navigate('Capitulos', { libro: item })}
      activeOpacity={0.7}
    >
      <View style={s.cardContent}>
        <Text style={s.libroNombre}>{item.nombre}</Text>
        <Text style={s.capsText}>{item.totalCapitulos} cap.</Text>
      </View>
    </TouchableOpacity>
  )

  const renderSeccion = (titulo: string, datos: Libro[]) => (
    datos.length > 0 ? (
      <>
        <Text style={s.seccionTitulo}>{titulo}</Text>
        <FlatList
          data={datos}
          keyExtractor={i => i.id.toString()}
          renderItem={renderLibro}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={s.fila}
        />
      </>
    ) : null
  )

  if (loading) {
    return (
      <View style={[s.container, s.center]}>
        <ActivityIndicator size="large" color={COLORES.acento} />
        <Text style={[s.subTexto, { marginTop: 12 }]}>Cargando Biblia...</Text>
      </View>
    )
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORES.fondo} />

      <Modal visible={showUpdate} transparent animationType="fade" onRequestClose={() => setShowUpdate(false)}>
        <View style={s.modalOverlay}>
          <View style={s.modalBox}>
            <Text style={s.modalEmoji}>🎉</Text>
            <Text style={s.modalTitulo}>Nueva versión disponible</Text>
            <Text style={s.modalCuerpo}>Hay una actualización con nuevas funciones y mejoras. ¿Deseas descargarla ahora?</Text>
            <TouchableOpacity style={s.modalBtnPrimario} onPress={() => { setShowUpdate(false); Linking.openURL(DOWNLOAD_URL) }} activeOpacity={0.8}>
              <Text style={s.modalBtnPrimarioTxt}>Descargar actualización</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.modalBtnSecundario} onPress={() => setShowUpdate(false)} activeOpacity={0.7}>
              <Text style={s.modalBtnSecundarioTxt}>Después</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={[]}
        renderItem={() => null}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={[s.header, { paddingTop: insets.top + 16 }]}>
              <View style={s.headerRow}>
                <View>
                  <Text style={s.titulo}>✝ Palabra Viva</Text>
                  <Text style={s.subTitulo}>Dios Habla Hoy</Text>
                </View>
                <TouchableOpacity style={s.shareBtn} onPress={compartir} activeOpacity={0.7}>
                  <Text style={s.shareIcon}>📤</Text>
                </TouchableOpacity>
              </View>
              {stats !== null && (
                <View style={s.statsRow}>
                  <Text style={s.statsTxt}>⬇️ {stats.downloads.toLocaleString('es')} descargas</Text>
                  <Text style={s.statsSep}>·</Text>
                  <Text style={s.statsTxt}>📲 {stats.installs.toLocaleString('es')} instalaciones</Text>
                </View>
              )}
            </View>

            {/* Continuar lectura */}
            {(progreso.lectura || progreso.audio) && (
              <View style={s.progresoBox}>
                <Text style={s.progresoTitulo}>Continuar</Text>
                {progreso.lectura && (
                  <TouchableOpacity
                    style={s.progresoCita}
                    onPress={() => nav.navigate('Lectura', {
                      libro: { id: progreso.lectura.libroId, nombre: progreso.lectura.libroNombre },
                      capitulo: progreso.lectura.capitulo,
                      modoAudio: false,
                    })}
                  >
                    <Text style={s.progresoIcon}>📖</Text>
                    <View>
                      <Text style={s.progresoLabel}>Lectura</Text>
                      <Text style={s.progresoDetalle}>
                        {progreso.lectura.libroNombre} {progreso.lectura.capitulo}:{progreso.lectura.versiculo}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                {progreso.audio && (
                  <TouchableOpacity
                    style={s.progresoCita}
                    onPress={() => nav.navigate('Lectura', {
                      libro: { id: progreso.audio.libroId, nombre: progreso.audio.libroNombre },
                      capitulo: progreso.audio.capitulo,
                      modoAudio: true,
                    })}
                  >
                    <Text style={s.progresoIcon}>🔊</Text>
                    <View>
                      <Text style={s.progresoLabel}>Audio</Text>
                      <Text style={s.progresoDetalle}>
                        {progreso.audio.libroNombre} {progreso.audio.capitulo}:{progreso.audio.versiculo}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Rutas temáticas */}
            <TouchableOpacity style={s.rutaBtn} onPress={() => nav.navigate('Rutas')} activeOpacity={0.8}>
              <Text style={s.rutaBtnIcon}>✨</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.rutaBtnTitulo}>Rutas temáticas</Text>
                <Text style={s.rutaBtnSub}>Jesús · María · Salmos · Sacramentos y más</Text>
              </View>
              <Text style={s.rutaBtnFlecha}>›</Text>
            </TouchableOpacity>

            {/* Guía emocional */}
            <TouchableOpacity style={s.emocionBtn} onPress={() => nav.navigate('Emociones')} activeOpacity={0.8}>
              <Text style={s.rutaBtnIcon}>💙</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.emocionBtnTitulo}>¿Cómo estás hoy?</Text>
                <Text style={s.emocionBtnSub}>Ansiedad · Duelo · Esperanza · Gratitud y más</Text>
              </View>
              <Text style={s.rutaBtnFlecha}>›</Text>
            </TouchableOpacity>

            {/* Preguntas bíblicas */}
            <TouchableOpacity style={s.preguntasBtn} onPress={() => nav.navigate('Preguntas')} activeOpacity={0.8}>
              <Text style={s.rutaBtnIcon}>🤔</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.preguntasBtnTitulo}>Preguntas Bíblicas</Text>
                <Text style={s.preguntasBtnSub}>Respuestas que la Biblia tiene</Text>
              </View>
              <Text style={s.rutaBtnFlecha}>›</Text>
            </TouchableOpacity>

            {/* Búsqueda */}
            <View style={s.searchBox}>
              <TextInput
                style={s.searchInput}
                placeholder="Buscar libro o versículo..."
                placeholderTextColor={COLORES.subTexto}
                value={busqueda}
                onChangeText={setBusqueda}
              />
            </View>

            {renderSeccion('Antiguo Testamento', at)}
            {renderSeccion('Nuevo Testamento', nt)}

            {/* Acerca de */}
            <TouchableOpacity style={s.acercaBtn} onPress={() => nav.navigate('AcercaDe')} activeOpacity={0.7}>
              <Text style={s.acercaTxt}>ℹ️  Acerca de esta app · Traducción DHH</Text>
            </TouchableOpacity>
          </>
        }
      />
    </View>
  )
}

const s = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORES.fondo },
  center:          { justifyContent: 'center', alignItems: 'center' },
  header:          { paddingBottom: 20, paddingHorizontal: 20 },
  headerRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titulo:          { fontSize: 28, fontWeight: '700', color: COLORES.texto },
  subTitulo:       { fontSize: 14, color: COLORES.subTexto, marginTop: 4 },
  subTexto:        { color: COLORES.subTexto },
  shareBtn:        { backgroundColor: COLORES.card, borderRadius: 12, padding: 10, borderWidth: 1, borderColor: COLORES.borde },
  shareIcon:       { fontSize: 20 },
  statsRow:        { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  statsTxt:        { fontSize: 12, color: COLORES.subTexto },
  statsSep:        { fontSize: 12, color: COLORES.borde },
  progresoBox:     { marginHorizontal: 16, marginBottom: 12, backgroundColor: COLORES.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORES.borde },
  progresoTitulo:  { color: COLORES.acento, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  progresoCita:    { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  progresoIcon:    { fontSize: 22 },
  progresoLabel:   { color: COLORES.subTexto, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 },
  progresoDetalle: { color: COLORES.texto, fontSize: 14, fontWeight: '600', marginTop: 2 },
  rutaBtn:         { marginHorizontal: 16, marginBottom: 10, backgroundColor: '#312e81', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  rutaBtnIcon:     { fontSize: 24 },
  rutaBtnTitulo:   { color: '#c7d2fe', fontWeight: '700', fontSize: 15 },
  rutaBtnSub:      { color: '#a5b4fc', fontSize: 12, marginTop: 2 },
  rutaBtnFlecha:   { color: COLORES.acento, fontSize: 24 },
  emocionBtn:      { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#0c2a2a', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#134e4a' },
  preguntasBtn:         { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#451a03', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#78350f' },
  preguntasBtnTitulo:   { color: '#fde68a', fontWeight: '700', fontSize: 15 },
  preguntasBtnSub:      { color: '#fbbf24', fontSize: 12, marginTop: 2 },
  acercaBtn:       { marginHorizontal: 16, marginTop: 20, marginBottom: 8, paddingVertical: 14, alignItems: 'center', borderTopWidth: 1, borderColor: COLORES.borde },
  acercaTxt:       { color: COLORES.subTexto, fontSize: 13 },
  emocionBtnTitulo:{ color: '#99f6e4', fontWeight: '700', fontSize: 15 },
  emocionBtnSub:   { color: '#5eead4', fontSize: 12, marginTop: 2 },
  modalOverlay:         { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalBox:             { backgroundColor: '#1e293b', borderRadius: 20, padding: 28, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  modalEmoji:           { fontSize: 40, marginBottom: 12 },
  modalTitulo:          { color: '#f1f5f9', fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 10 },
  modalCuerpo:          { color: '#94a3b8', fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  modalBtnPrimario:     { backgroundColor: '#818cf8', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, width: '100%', alignItems: 'center', marginBottom: 10 },
  modalBtnPrimarioTxt:  { color: '#fff', fontWeight: '700', fontSize: 16 },
  modalBtnSecundario:   { paddingVertical: 10 },
  modalBtnSecundarioTxt:{ color: '#94a3b8', fontSize: 14 },
  searchBox:       { marginHorizontal: 16, marginBottom: 12 },
  searchInput:     { backgroundColor: COLORES.card, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, color: COLORES.texto, fontSize: 15, borderWidth: 1, borderColor: COLORES.borde },
  seccionTitulo:   { fontSize: 13, fontWeight: '700', color: COLORES.acento, textTransform: 'uppercase', letterSpacing: 1, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  fila:            { paddingHorizontal: 12, gap: 8, marginBottom: 8 },
  card:            { flex: 1, backgroundColor: COLORES.card, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: COLORES.borde },
  cardContent:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  libroNombre:     { color: COLORES.texto, fontSize: 14, fontWeight: '600', flex: 1 },
  capsText:        { color: COLORES.subTexto, fontSize: 12 },
})
