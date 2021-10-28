import React from 'react'
import toast from 'react-hot-toast'
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker } from 'react-leaflet'

// ** Map config
import { MAP_CENTER, MAP_ZOOM, MAP_CONFIG } from '.'

// ** UI
import { Button } from '../'

// ** Utils
import { WMSTileLayerWithHeader } from '../../../utils/WMSTileLayerWithHeader'
import classNames from '../../../utils/classNames'

function ChoosableMap({ className, position: currentPosition, onChoose }) {
  const [map, setMap] = React.useState(null)
  const [position, setPosition] = React.useState([currentPosition[0] || MAP_CENTER[0], currentPosition[1] || MAP_CENTER[1]])

  const onMove = React.useCallback(() => {
    const position = map.getCenter()
    setPosition([position.lat.toFixed(5), position.lng.toFixed(5)])
  }, [map, setPosition])

  React.useEffect(() => {
    map?.on('move', onMove)
    return () => {
      map?.off('move', onMove)
    }
  }, [map, onMove])

  const mapMarker = leaflet.icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -25],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  })

  const onGoMyPostion = () => {
    if (!('geolocation' in navigator)) {
      toast.error('مرورگر شما از موقعیت مکانی پشتیبانی نمیکند!', { id: 'geolocation' })
    }
    navigator.geolocation.getCurrentPosition(
      (location) =>
        map.flyTo([location.coords.latitude, location.coords.longitude], MAP_ZOOM + 5, {
          duration: 1
        }),
      () => toast.error('دریافت موقعیت مکانی شما با مشکل مواجه شده است!', { id: 'geolocation' })
    )
  }

  const canChoose = React.useMemo(
    () => (currentPosition[0] || MAP_CENTER[0]).toFixed(5) !== position[0] && (currentPosition[1] || MAP_CENTER[1]).toFixed(5) !== position[1],
    [currentPosition, position]
  )

  const onChooseLocation = React.useCallback(async () => {
    const { reverse } = MAP_CONFIG
    try {
      const mapHeaders = new Headers()
      mapHeaders.append('x-api-key', MAP_CONFIG.mapApiKey)

      const response = await fetch(`${reverse}?lat=${position[0]}&lon=${position[1]}`, {
        method: 'GET',
        headers: mapHeaders,
        redirect: 'follow'
      })
      const resualt = await response.json()

      const details = {
        lat: position[0],
        lng: position[1],
        city: resualt?.city,
        state: resualt?.province,
        originalAddress: resualt?.address_compact
      }

      onChoose(details)
    } catch (err) {
      toast.error('دریافت اطلاعات نشانی شما با مشکل مواجه شده است!', { id: 'reverse' })
    }
  }, [position, onChoose])

  React.useEffect(
    () =>
      (currentPosition[0] || currentPosition[1]) &&
      map?.flyTo(currentPosition, MAP_ZOOM + 5, {
        duration: 1
      }),
    [map, currentPosition]
  )

  return (
    <MapContainer className={className} center={MAP_CENTER} zoom={MAP_ZOOM} scrollWheelZoom whenCreated={setMap}>
      <Button className="absolute z-[400] w-8 top-2 right-2 text-base" type="ghost" icon="marker" onClick={onGoMyPostion} />
      <WMSTileLayerWithHeader
        headers={{ 'x-api-key': MAP_CONFIG.mapApiKey }}
        url="https://map.ir/shiveh"
        layers="Shiveh:Shiveh"
        format="image/png"
        tileSize={128}
        maxZoom={20}
        minZoom={1}
        transparent
        tms
      />
      <Marker icon={mapMarker} position={position} />
      <div
        className={classNames(
          'absolute left-0 right-0 flex justify-center z-[400] transition-all duration-200',
          canChoose ? 'bottom-2' : '-bottom-8'
        )}
      >
        <Button autoLoading roundless className="font-peyda text-sm" icon="cursor-finger" onClick={onChooseLocation}>
          انتخاب نشانی
        </Button>
      </div>
    </MapContainer>
  )
}

export default React.memo(ChoosableMap)
