class Marker {
  constructor(id, label, icon, animation, lat, lng) {
    this.id = id;
    this.label = label;
    this.icon = icon;
    this.animation = animation;
    this.position = new Position(lat, lng);
  }
}

class Position {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}

export { Marker, Position }