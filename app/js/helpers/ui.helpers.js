import interact from "interactjs";

export const setDraggableMapTools = (mapTools) => {
  let x = 0;
  let y = 0;

  interact(mapTools)
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [interact.snappers.grid({ x: 30, y: 30 })],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
        interact.modifiers.restrict({
          restriction: mapTools.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true,
        }),
      ],
      inertia: true,
    })
    .on("dragmove", function (event) {
      x += event.dx;
      y += event.dy;

      event.target.style.transform = "translate(" + x + "px, " + y + "px)";
    });
};

export const setClosableSidebar = (sidebar, onClick) => {
  let sidebarX = 0;
  let sidebarY = 0;

  interact(sidebar)
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [interact.snappers.grid({ x: 30, y: 30 })],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
        interact.modifiers.restrict({
          restriction: sidebar.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true,
        }),
      ],
      inertia: true,
    })
    .on("dragmove", function (event) {
      sidebarX += event.dx;
      sidebarY += event.dy;

      event.target.style.transform =
        "translate(" + sidebarX + "px, " + sidebarY + "px)";
    })
    .on("click", onClick);
};
