import { SHAPES_CONTROLS, SHAPE_SETTINGS } from "../constants";

export const highlightShape = (shape) => {
  if (!shape) {
    return;
  }

  shape.setOptions(SHAPE_SETTINGS.HIGHLIGHT);

  setTimeout(() => {
    shape.setOptions(SHAPE_SETTINGS.DEFAULT);
  }, 500);
};

export const editShape = (
  shape,
  edit = true,
  drawingManager,
  selectedShape
) => {
  if (!shape || shape === selectedShape) {
    return;
  }

  if (edit) {
    drawingManager && drawingManager.setDrawingMode(null);

    shape.setOptions(SHAPE_SETTINGS.EDIT);

    selectedShape = shape;
  } else {
    shape.setOptions(SHAPE_SETTINGS.DEFAULT);
    selectedShape = null;
  }
};

export const clearEdits = (mapShapes) => {
  if (!mapShapes) {
    return;
  }

  mapShapes.forEach((shape) => {
    editShape(shape, false);
  });

  document
    .querySelectorAll(`[data-action="${SHAPES_CONTROLS.CONFIRM_DELETE}"]`)
    .forEach((confirmDeleteButton) => {
      confirmDeleteButton.classList.remove("d-block");
      confirmDeleteButton.classList.add("d-none");
    });

  document
    .querySelectorAll(`[data-action="${SHAPES_CONTROLS.DELETE}"]`)
    .forEach((deleteButton) => {
      deleteButton.classList.remove("d-none");
      deleteButton.classList.add("d-block");
    });
};

export const drawShapeRow = (paddockName, shapeLength, index) => {
  return `
    <div class="created-fence" data-action="${
      SHAPES_CONTROLS.HIGHLIGHT
    }" data-shape="${index}">
      <div class="created-fence__section">
        <p class="created-fence__section-label">Name</p>
        <input id="paddock-description-${index}" value="${paddockName}" type="test" data-shape="${index}" data-action="${
    SHAPES_CONTROLS.EDIT_NAME
  }" data-shape="${index}"  class="created-fence__name" autocomplete="off"/>
      </div>
      <div class="created-fence__section">
        <p class="created-fence__section-label">Length</p>
        <p class="created-fence__length">${shapeLength.toFixed(0)}m </p>
      </div>
      <div class="created-fence__section created-fence__section--actions">
        <button type="button" data-action="${
          SHAPES_CONTROLS.DELETE
        }" data-shape="${index}" class="btn-control-icons btn-control-icons--delete d-block created-fence__delete">
          <img class="created-fence__icon" src="assets/tool-bin.svg"/>
        </button>
      </div>
    </div>
  `;
};

const findAddressDetail = (address, detail, shortVersion = false) => {
  if (!address) {
    return;
  }

  return address.find((element) =>
    element.types.some((type) => type === detail)
  )[shortVersion ? "short_name" : "long_name"];
};

export const displayAddressOnMap = (
  place,
  map,
  addressMarker,
  addressLabel
) => {
  if (!place || !map) {
    return;
  }

  // If the place has a geometry, then present it on a map.
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(16);
  }

  // display the marker on map
  if (addressMarker) {
    addressMarker.setPosition(place.geometry.location);
    addressMarker.setVisible(true);
  }

  // show the address on map controllers
  const address = place.address_components;

  if (addressLabel) {
    addressLabel.innerHTML = `
    <span class="address-line-1">${findAddressDetail(
      address,
      "locality"
    )}, ${findAddressDetail(address, "administrative_area_level_2")}</span>
    <span class="address-line-2">${findAddressDetail(
      address,
      "postal_code"
    )} ${findAddressDetail(
      address,
      "administrative_area_level_1"
    )}  ${findAddressDetail(address, "country", true)}</span>`;
    place.adr_address.replace(/\,/g, "");
  }
};
