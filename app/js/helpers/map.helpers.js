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
