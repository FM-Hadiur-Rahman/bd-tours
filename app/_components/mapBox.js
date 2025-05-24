"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBoxComponent = ({ tour }) => {
  const mapContainerRef = useRef(null); // Using ref instead of an ID
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return; // Avoid duplicate initialization

    mapboxgl.accessToken =
      "pk.eyJ1IjoiZm1oYWRpdXIiLCJhIjoiY203OTF1cnE1MDBpODJqcGozcTd0cmpjNiJ9.T05rxdFXvq_36YnU67V2kA";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // Attach map to this div
      style: "mapbox://styles/fmhadiur/cm792zh4800gk01s6a0ik54kv",
      scrollZoom: false,
      center: [90.4125, 23.8103], // Example: Dhaka, Bangladesh
      zoom: 9,
      interactive: true,
    });

    return () => mapRef.current?.remove(); // Cleanup map on unmount
  }, []);

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full  rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white">
        <div
          ref={mapContainerRef}
          className="w-full h-50 sm:h-50 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default MapBoxComponent;
