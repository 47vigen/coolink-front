import { createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core'
import { TileLayer } from 'leaflet'

async function fetchImage(url, callback, headers, abort) {
  const controller = new AbortController()
  const signal = controller.signal
  if (abort) {
    abort.subscribe(() => {
      controller.abort()
    })
  }
  const f = await fetch(url, {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    signal: signal
  })
  const blob = await f.blob()
  callback(blob)
}

var LWMSTileLayerWithHeader = TileLayer.WMS.extend({
  initialize: function (url, options) {
    const { headers, abort, results, ...props } = options
    TileLayer.WMS.prototype.initialize.call(this, url, props)
    this.headers = headers
    this.abort = abort
    this.results = results
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords)
    const img = document.createElement('img')
    img.setAttribute('role', 'presentation')

    fetchImage(
      url,
      (resp) => {
        const reader = new FileReader()
        reader.onload = () => {
          img.src = reader.result
          if (this.results) {
            this.results.next(reader.result)
          }
        }
        reader.readAsDataURL(resp)
        done(null, img)
      },
      this.headers,
      this.abort
    )
    return img
  }
})

export const WMSTileLayerWithHeader = createTileLayerComponent(
  function createWMSTileLayer({ params = {}, url, ...options }, context) {
    return {
      instance: new LWMSTileLayerWithHeader(url, {
        ...params,
        ...withPane(options, context)
      }),
      context
    }
  },
  function updateWMSTileLayer(layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps)

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params)
    }
  }
)
