import { COLORS, OPACITY } from "./colors.constants";

export const MAP_SETTINGS = {
  key: "AIzaSyDKn1YutebCypgyFrQSP6gtACQ_LbCsEGs",
  options: {
    libraries: ["drawing", "places", "geometry"],
    version: "3",
  },
};
export const DEFAULT_COORDINATES = {
  lat: -37.8136276,
  lng: 144.9630576,
};

export const DEFAULT_ZOOM = 15;
export const EXPORT_ZOOM = 16;

export const MAP_OPTIONS = {
  center: DEFAULT_COORDINATES,
  zoom: DEFAULT_ZOOM,
  fullscreenControl: false,
  mapTypeControl: false,
  mapTypeId: "satellite",
  streetViewControl: false,
  tilt: 0,
  zoomControl: false,
};

export const SHAPE_SETTINGS = {
  DEFAULT: {
    fillOpacity: OPACITY.DEFAULT,
    fillColor: COLORS.DEFAULT,
    strokeColor: COLORS.STROKE,
    strokeWeight: 3,
    editable: true,
    draggable: true,
    clickable: true,
    visible: true,
  },
  EDIT: {
    fillOpacity: OPACITY.EDIT,
    fillColor: COLORS.EDIT,
    strokeColor: COLORS.EDIT,
  },
  HIGHLIGHT: {
    fillOpacity: OPACITY.HIGHLIGHT,
    fillColor: COLORS.HIGHLIGHT,
    strokeColor: COLORS.HIGHLIGHT,
  },
};

export const SHAPES_CONTROLS = {
  HIGHLIGHT: "highlight",
  EDIT: "edit",
  DELETE: "delete",
  CONFIRM_DELETE: "confirm-delete",
  EDIT_NAME: "edit-name",
};
