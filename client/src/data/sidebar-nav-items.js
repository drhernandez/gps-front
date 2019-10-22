export default function() {
  return [
    {
      title: "Mi ubicación",
      to: "/home",
      htmlBefore: '<i class="material-icons">my_location</i>',
      htmlAfter: ""
    },
    {
      title: "Mapa de calor",
      htmlBefore: '<i class="material-icons">map</i>',
      to: "/heat-map",
    },
    {
      title: "Alertas",
      htmlBefore: '<i class="material-icons">notifications_active</i>',
      to: "/alerts",
    }
  ];
}
