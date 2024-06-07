import React, { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';

const ContextMenu = () => {
  const map = useMapEvents({
    contextmenu: (e) => {
      const { lat, lng } = e.latlng;
      const contextMenu = document.createElement('div');
      contextMenu.className = 'context-menu';
      contextMenu.style.cssText = `
        position: absolute;
        background-color: white;
        border: 1px solid gray;
        border-radius: 5px;
        padding: 8px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        top: ${e.containerPoint.y}px;
        left: ${e.containerPoint.x}px;
      `;

      const coordinatesText = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      const showCoordinatesItem = createMenuItem(coordinatesText, () => {
        navigator.clipboard.writeText(coordinatesText);
      });

      const addMarkerItem = createMenuItem('Add Marker', () => {
        // Handle add marker functionality
        console.log('Add Marker clicked');
      });

      contextMenu.appendChild(showCoordinatesItem);
      contextMenu.appendChild(addMarkerItem);

      map.getContainer().appendChild(contextMenu);

      // Remove context menu on map click
      map.on('click', () => {
        if (contextMenu.parentNode) {
          contextMenu.parentNode.removeChild(contextMenu);
        }
      });
    },
  });

  const createMenuItem = (text, onClick) => {
    const menuItem = document.createElement('div');
    menuItem.innerText = text;
    menuItem.style.cssText = `
      padding: 5px 10px;
      cursor: pointer;
      border-radius: 10px;
    `;
    menuItem.onmouseenter = () => {
      menuItem.style.backgroundColor = '#bab4b4';
    };
    menuItem.onmouseleave = () => {
      menuItem.style.backgroundColor = 'transparent';
    };
    menuItem.onclick = () => {
      onClick();
      const contextMenu = document.querySelector('.context-menu');
      if (contextMenu && contextMenu.parentNode) {
        contextMenu.parentNode.removeChild(contextMenu);
      }
    };
    return menuItem;
  };

  return null;
};

export default ContextMenu;
