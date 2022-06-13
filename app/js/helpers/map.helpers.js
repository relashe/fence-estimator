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
        <input id="paddock-name-${index}" value="${paddockName}" type="test" data-action="${
    SHAPES_CONTROLS.EDIT_NAME
  }" data-shape="${index}"  class="created-fence__name"/>
      </div>
      <div class="created-fence__section">
        <p class="created-fence__section-label">Length</p>
        <p class="created-fence__length">${shapeLength.toFixed(0)}m </p>
      </div>
      <div class="created-fence__section created-fence__section--actions">
        <button type="button" data-action="${
          SHAPES_CONTROLS.EDIT
        }" data-shape="${index}" class="btn-control-icons created-fence__edit">
          Edit
        </button>
        <button type="button" data-action="${
          SHAPES_CONTROLS.DELETE
        }" data-shape="${index}" class="btn-control-icons btn-control-icons--delete d-block created-fence__delete">
          <i class="fa fa-trash">d</i>
        </button>
        <button type="button" data-action="${
          SHAPES_CONTROLS.CONFIRM_DELETE
        }" data-shape="${index}" class="btn-control-icons d-none created-fence__delete created-fence__delete--confirm">
          <i class="fa fa-times"></i> Click to confirm
        </button>
      </div>
    </div>
  `;
};
