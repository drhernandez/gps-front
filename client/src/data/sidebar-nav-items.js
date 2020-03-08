import { CLIENTE, ADMIN } from "./Roles";

export default function() {
  return [
    {
      title: "Mi ubicación",
      to: "/home",
      htmlBefore: '<i class="material-icons">my_location</i>',
      htmlAfter: "",
      roles: [CLIENTE]
    },
    {
      title: "Mapa de calor",
      htmlBefore: '<i class="material-icons">map</i>',
      to: "/heat-map",
      roles: [CLIENTE]
    },
    {
      title: "Alertas",
      htmlBefore: '<i class="material-icons">notifications_active</i>',
      to: "/alerts",
      roles: [CLIENTE]
    },
    {
      title: "Alta de cliente",
      to: "/new-client",
      htmlBefore: '<i class="material-icons">person_add</i>',
      htmlAfter: "",
      roles: [ADMIN]
    },
    {
      title: "Administrar clientes",
      to: "/clients",
      htmlBefore: '<i class="material-icons">build</i>',
      htmlAfter: "",
      roles: [ADMIN]
    }
  ];
}
