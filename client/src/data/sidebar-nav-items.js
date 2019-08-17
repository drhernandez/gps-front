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
    },
    {
      title: "Blog Dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      to: "/blog-overview",
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }
  ];
}
