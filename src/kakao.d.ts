declare namespace kakao {
  namespace maps {
    function load(callback: () => void): void;
    class Map {
      constructor(container: HTMLElement, options: { center: LatLng; level: number });
      setZoomable(zoomable: boolean): void;
    }
    class LatLng {
      constructor(lat: number, lng: number);
    }
    class Marker {
      constructor(options: { position: LatLng; map: Map });
    }
  }
}

interface Window {
  kakao: typeof kakao;
}
