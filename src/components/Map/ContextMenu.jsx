import React, { useEffect } from 'react';
import L from 'leaflet';

const ContextMenu = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    const showContextMenu = (e) => {
      e.originalEvent.preventDefault();

      // Remove existing context menu if any
      const existingMenu = document.getElementById('context-menu');
      if (existingMenu) {
        existingMenu.remove();
      }

      // Create context menu
      const contextMenu = document.createElement('div');
      contextMenu.id = 'context-menu';
      Object.assign(contextMenu.style, {
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '8px',
        zIndex: '1000',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        top: `${e.originalEvent.clientY - 50}px`,
        left: `${e.originalEvent.clientX}px`,
      });

      // Add menu items
      const createMenuItem = (text, onClick) => {
        const menuItem = document.createElement('div');
        menuItem.innerText = text;
        Object.assign(menuItem.style, {
          padding: '5px 10px',
          cursor: 'pointer',
          borderRadius: '10px',
        });
        menuItem.onmouseenter = () => {
          menuItem.style.backgroundColor = '#bab4b4';
        };
        menuItem.onmouseleave = () => {
          menuItem.style.backgroundColor = 'transparent';
        };
        menuItem.onclick = () => {
          onClick();
          contextMenu.remove();
        };
        return menuItem;
      };
      
      const coordinatesText = `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
      const showCoordinatesItem = createMenuItem(coordinatesText, () => {
        navigator.clipboard.writeText(coordinatesText)
          // .then(() => {
          //   console.log('Coordinates copied to clipboard');
          // })
          // .catch((error) => {
          //   console.error('Failed to copy coordinates: ', error);
          // });
      });
      
      const addMarkerItem = createMenuItem('Add Marker', () => {
        L.marker(e.latlng).addTo(map);
      });

      contextMenu.appendChild(showCoordinatesItem);
      contextMenu.appendChild(addMarkerItem);

      // Append the context menu to the map container
      map.getContainer().appendChild(contextMenu);
    };

    // Add contextmenu event listener
    map.on('contextmenu', showContextMenu);

    // Remove context menu on map click
    map.on('click', () => {
      const existingMenu = document.getElementById('context-menu');
      if (existingMenu) {
        existingMenu.remove();
      }
    });

    // Cleanup on component unmount
    return () => {
      map.off('contextmenu', showContextMenu);
      map.off('click');
    };
  }, [map]);

  return null;
};

export default ContextMenu;
