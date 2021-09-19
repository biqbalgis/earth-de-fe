import "ol/ol.css";
import "ol-geocoder/dist/ol-geocoder.css";
import "ol-ext/dist/ol-ext.min.css";
import "../../../static/css/LayerSwitcher.css";
import Map from "ol/Map";
import View from "ol/View";
import {defaults as defaultControls, FullScreen} from "ol/control";
import Geocoder from "ol-geocoder/dist/ol-geocoder";
import * as autoBind from "auto-bind";
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import {Group, Tile} from "ol/layer";
import {OSM, Stamen} from "ol/source";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import Api, {APIs} from "../../../Api";
import TileGrid from "ol/tilegrid/TileGrid";
import {get as getProjection} from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Select from "ol/interaction/Select";
import {altKeyOnly, click} from "ol/events/condition";

export const mapStyle = {
  position: "relative",
  height: "100%",
  width: "100%"
};

class MapVM {
  map = new Map({
    controls: defaultControls().extend([
      new FullScreen()
    ]),
    projection: "EPSG:3857"
  });

  baseLayers = null;
  overlayLayer = {};
  customInteraction = [];
  iconLayer = null;

  constructor () {
    autoBind(this);
    this.addBaseLayers();
  }

  initMap (targetDiv) {
    // const control = ;
    // this.map.addControl(controls)
    // this.map.addLayer(this.baseLayer.osm)

    this.map.setTarget(targetDiv);

    const view = new View({
      // center: [31, 74],
      // zoom: 12
      center: [7960989.072138175, 3673858.3782883845],
      zoom: 9
    });
    this.map.setView(view);
    this.addGeocoder();
    this.addLayerSwitcher();
  }

  getMap () {
    return this.map;
  }

  getOverLayer (name) {
    return this.overlayLayer.name;
  }

  addLayerSwitcher () {
    const ctrl = new LayerSwitcher();
    this.map.addControl(ctrl);
  }

  addOverlayLayer (layer) {
    this.map?.addLayer(layer);
    this.overlayLayer[layer.get("name")] = layer;
  }

  addCustomInteraction (interaction) {
    this.map?.addInteraction(interaction);
    this.customInteraction.push(interaction);
  }

  removeAllCustomInteraction () {
    this.customInteraction.forEach((item) => {
      this.map?.removeInteraction(item);
    });
  }

  addGeocoder () {
    const geocoder = new Geocoder("nominatim", {
      provider: "osm",
      // key: '__some_key__',
      // provider: 'mapquest',
      // key: 'my_coder',
      lang: "en-US", // en-US, fr-FR, pt-Br
      placeholder: "Search Placemark ...",
      targetType: "glass-button",
      limit: 5,
      // countrycodes: 'pk',
      keepOpen: true
    });
    this.map?.addControl(geocoder);
    geocoder.on("addresschosen", function (evt) {
      // alert(evt.coordinates)
      // var feature = evt.feature,
      //     coord = evt.coordinate,
      //     address = evt.address;
      // // some popup solution
      // content.innerHTML = '<p>' + address.formatted + '</p>';
      // overlay.setPosition(coord);
    });
    document.getElementById("gcd-container").setAttribute("title", "Search Placemarks");
  }

  addBaseLayers () {
    this.baseLayers = new Group({
      title: "Base Layers",
      openInLayerSwitcher: false,
      layers: [
        new Tile({
          title: "Watercolor",
          baseLayer: true,
          visible: false,
          source: new Stamen({layer: "watercolor"})
        }),
        new Tile({
          title: "Toner",
          baseLayer: true,
          visible: false,
          source: new Stamen({layer: "toner"})
        }),
        new Tile({
          title: "OSM",
          baseLayer: true,
          source: new OSM(),
          visible: true
        })
      ]
    });
    this.map.addLayer(this.baseLayers);
  }

  addMVTLayer (uuid, name, title) {
    // Calculation of resolutions that match zoom levels 1, 3, 5, 7, 9, 11, 13, 15.
    const resolutions = [];
    for (let i = 0; i <= 8; ++i)
      resolutions.push(156543.03392804097 / Math.pow(2, i * 2));



    const source = new VectorTileSource({
      // url: url + "{z}/{x}/{y}/",
      format: new MVT(),
      tileGrid: new TileGrid({
        extent: getProjection("EPSG:3857").getExtent(),
        resolutions: resolutions,
        tileSize: 512
      }),
      tileUrlFunction: (tileCoord) => {
        const z = String(tileCoord[0] * 2 - 1);
        const x = String(tileCoord[1]);
        const y = String(tileCoord[2]);
        // url = url.replace("{z}", String(tileCoord[0] * 2 - 1))
        //   .replace("{x}", String(tileCoord[1]))
        //   .replace("{y}", String(tileCoord[2]));
        // console.log("url", url);
        const url = Api.getURL(APIs.LAYER_MVT, {uuid, z, x, y});
        return url;
        // Api.get(APIs.LAYER_MVT, {uuid,z,x,y}, false).then((response)=>{
        //   // console.log("mvt response", response);
        //   //   console.log()
        //     source.getFormat().readFeature()
        //
        // });
      },
      tileLoadFunction: (tile, url) => {
        tile.setLoader(async (extent, resolution, projection) => {
          const accessToken = await Api.getAccessToken();
          if (accessToken)
            fetch(url, {
              headers: new Headers({
                "Authorization": "Bearer " + accessToken
              })
            }).then((response) => {
              response.arrayBuffer().then((data) => {
                // console.log("buffer data", data);
                const format = tile.getFormat(); // ol/format/MVT configured as source format
                const features = format.readFeatures(data, {
                  extent: extent,
                  featureProjection: projection
                });
                tile.setFeatures(features);
              });
            });



        });
      }
    });
    const layer = new VectorTileLayer({
      name: name,
      title: title,
      declutter: true,
      source: source
    });
    this.addOverlayLayer(layer);
  }

  zoomToExtent (extent) {
    this.map.getView().fit(extent);

  }

  convertGeoJsonToFeature (geoJsonFeatures) {
    const geoJson = new GeoJSON();
    return geoJson.readFeatures(geoJsonFeatures);

  }

  convertFeatureToGeoJson (feature) {
    const geoJson = new GeoJSON();
    return geoJson.writeFeature(feature);
  }

  getLayerByTitle (layerName) {
    const layers = this.map.getLayers && this.map.getLayers();
    let matchedLayer = null;
    layers.forEach((layer) => {
      if (layer.values_.title === layerName) {
        console.log("layer.values_.title", layer.values_.title);
        console.log("layerName", layerName);
        matchedLayer = layer;
        return;
      }
    });
    return matchedLayer;
  }

  removeDrawingFeature () {
    const map = this.map;
    const drawingLayer = this.getLayerByTitle("drawing layer");
    // eslint-disable-next-line no-undef
    this.select = new Select({
      condition: (mapBrowserEvent) => {
        return click(mapBrowserEvent) && altKeyOnly(mapBrowserEvent);
      },
      layers: [drawingLayer]
    });

    if (this.select !== null)
      map.addInteraction(this.select);



    this.select.on("select", (evt) => {
      const features = evt.selected;
      features.forEach((f) => {
        drawingLayer.getSource().removeFeature(f);
      });
    });
  }

}

export default MapVM;
