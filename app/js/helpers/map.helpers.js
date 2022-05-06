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
  <tr>
    <th scope="row"><p data-action="${
      SHAPES_CONTROLS.HIGHLIGHT
    }" data-shape="${index}">
    <input id="paddock-name-${index}" value="${paddockName}" type="test" data-action="${
    SHAPES_CONTROLS.EDIT_NAME
  }" data-shape="${index}" /></p></th>
    <th scope="col">${shapeLength.toFixed(0)}m </th>
    <td>
      <button type="button" data-action="${
        SHAPES_CONTROLS.EDIT
      }" data-shape="${index}" class="btn-control-icons">
        <i class="fa fa-edit">e</i>
      </button>
    </td>
    <td>
      <button type="button" data-action="${
        SHAPES_CONTROLS.DELETE
      }" data-shape="${index}" class="btn-control-icons d-block">
        <i class="fa fa-trash">d</i>
      </button>
      <button type="button" data-action="${
        SHAPES_CONTROLS.CONFIRM_DELETE
      }" data-shape="${index}" class="btn-control-icons d-none">
        <i class="fa fa-times"></i> Click to confirm
      </button>
    </td>
  </tr>
  `;
};
