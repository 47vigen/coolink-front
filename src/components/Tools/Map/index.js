import React from 'react'
import { MapContainer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { WMSTileLayerWithHeader } from '../../../utils/WMSTileLayerWithHeader'
import leaflet from 'leaflet'

export const MAP_CENTER = [34.087826, 49.686366]
export const MAP_ZOOM = 13
export const MAP_CONFIG = {
  mapApiKey:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNiYjEzZjUyYWUxNTFjZjUwYTU3MjZiNGZiOWZhZGMwMzk0MDVlYTRmYzI4MmQ0MjU3ZDViYmJmODhjYTJmNThhODUzNGE1ZDg4M2Y0YWYzIn0.eyJhdWQiOiIxNTU3MyIsImp0aSI6ImNiYjEzZjUyYWUxNTFjZjUwYTU3MjZiNGZiOWZhZGMwMzk0MDVlYTRmYzI4MmQ0MjU3ZDViYmJmODhjYTJmNThhODUzNGE1ZDg4M2Y0YWYzIiwiaWF0IjoxNjMyMzI4MTI3LCJuYmYiOjE2MzIzMjgxMjcsImV4cCI6MTYzNDgzMzcyNywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.lFBWM9ClrHQtz0YBehjelH2ktwI4cPTnfdmOUyBVpMzRKgnD2BMZFrRo_rdnYbm4zw_5TZc8--ImTQa2-CkaHfJ4V2XAZTdUh-wKR-HJoPLDMuYv8mvEDJyPfsH-ATDQTBOKycynmV7kee5tszSlgGv0y15Pi16bIao_X3vZiA6sQNXDy_0y_OVvswqQ97FkDr5xTv8iNJsExDw7-dtlP8xEgofBZy9KxgEpAa-_FieLt6DRZEFwXP-UcN8_pxbn04dANBj1vmJyv7SoC9yLLZrjGMmnOhpsynd5PNzJGaYSpzMv2VCbr4-vzQkIiq0QwvuIBaAl7w1A8Zl_Z2fc8Q',
  search: 'https://map.ir/search/v2/autocomplete',
  reverse: 'https://map.ir/reverse',
  static: 'https://map.ir/static'
}

function Map({ className, position: currentPosition, zoom }) {
  const position = React.useMemo(() => [currentPosition[0] || MAP_CENTER[0], currentPosition[1] || MAP_CENTER[1]], [currentPosition])

  const mapMarker = leaflet.icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -25],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  })

  return (
    <MapContainer className={className} center={position} zoom={zoom || MAP_ZOOM} scrollWheelZoom>
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
    </MapContainer>
  )
}

export default React.memo(Map)
