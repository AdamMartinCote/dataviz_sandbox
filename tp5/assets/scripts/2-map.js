"use strict";

/**
 * Fichier permettant de gérer l'affichage de la carte.
 */


/**
 * Initialise le fond de carte qui doit être utilisé et la position d'affichage initial.
 *
 * @param L     Le contexte Leaflet.
 * @param map   La carte Leaflet.
 *
 * @see https://gist.github.com/d3noob/9211665
 */
function initTileLayer(L, map) {
  /* TODO: Initialiser le "tileLayer" avec les propriétés suivantes:
     - URL du fond de carte: https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png;
     - Zoom maximum: 10;
     - Zoom minimum: 1.

     Régler l'affichage initial (view) de la carte aux valeurs suivantes:
     - Coordonnées: [57.3, -94.7];
     - Niveau de zoom: 4.
  */
  map.setView([57.3, -94.7], 4);
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://basemaps.cartocdn.com">basemaps</a>',
      minzoom: 1,
      maxzoom: 10
    }).addTo(map);
}

/**
 * Initialise le contexte SVG qui devra être utilisé au-dessus de la carte Leaflet.
 *
 * @param map   La carte Leaflet.
 * @return      L'élément SVG créé.
 *
 * @see https://gist.github.com/d3noob/9211665
 */
function initSvgLayer(map) {
  // TODO: Créer l'élément SVG en vous basant sur l'exemple fourni. Assurez-vous de créer un élément "g" dans l'élément SVG.

  let svg = d3
      .select(map.getPanes().overlayPane)
      .append("svg");
  svg
    .append("g")
    .attr("class", "leaflet-zoom-hide");

  return svg;
}

/**
 * Crée les tracés des circonscriptions sur le contexte SVG qui se trouve au-dessus de la carte Leaflet.
 *
 * @param g             Le groupe dans lequel les tracés des circonscriptions doivent être créés.
 * @param path          La fonction qui doit être utilisée pour tracer les entités géométriques selon la bonne projection.
 * @param canada        Les entités géographiques qui doivent être utilisées pour tracer les circonscriptions.
 * @param sources       Les données contenant les informations sur chacune des circonscriptions.
 * @param color         L'échelle de couleurs qui est associée à chacun des partis politiques.
 * @param showPanel     La fonction qui doit être appelée pour afficher le panneau d'informations.
 */
function createDistricts(g, path, canada, sources, color, showPanel) {
  /* TODO: Créer les tracés des circonscriptions. Assurez-vous de respecter les spécifications suivantes:
     - La couleur de la circonscription doit correspondre à la couleur du parti du candidat gagnant; OK
     - L'opacité de la couleur (fill-opacity) doit être de 80%; OK
     - La couleur des traits doit être "#333"; OK
     - Lorsqu'une circonscription est cliquée, celle-ci doit devenir sélectionnée (classe "selected") et le panneau
     d'informations associé à cette circonscription doit faire son apparition (utiliser la fonction "showPanel").
     Il est à noter qu'il est possible de sélectionner uniquement une circonscription à la fois.
  */
  var regions = g
    .append("g")
      .selectAll("path")
      .data(canada.features)
      .enter()
    .append("path")
      .attr("d", path)
      .attr("fill", d => {
        const id = d.properties.NUMCF;
        const all = sources.find( e => e.id === id);
        const party = all.results.sort( (a, b) => b.votes - a.votes )[0].party;
        return color(party);
      })
      .attr("fill-opacity", .8)
      .attr("stroke", "#333")
      .on("click", (d) => {
        const id = d.properties.NUMCF;
        showPanel(id); // TODO : check
        regions.classed("selected", false);
        d3.event.srcElement.classList.add("selected");
      })
  ;
}

/**
 * Met à jour la position et la taille de l'élément SVG, la position du groupe "g" et l'affichage des tracés lorsque
 * la position ou le zoom de la carte est modifié.
 *
 * @param svg       L'élément SVG qui est utilisé pour tracer les éléments au-dessus de la carte Leaflet.
 * @param g         Le groupe dans lequel les tracés des circonscriptions ont été créés.
 * @param path      La fonction qui doit être utilisée pour tracer les entités géométriques selon la bonne projection.
 * @param canada    Les entités géographiques qui doivent être utilisées pour tracer les circonscriptions.
 *
 * @see https://gist.github.com/d3noob/9211665
 */
function updateMap(svg, g, path, canada) {
  // TODO: Mettre à jour l'élément SVG, la position du groupe "g" et l'affichage des tracés en vous basant sur l'exemple fourni.

  let bounds = path.bounds(canada); // ???
  let topLeft = bounds[0],
      bottomRight = bounds[1];
  svg
    .attr("width",  bottomRight[0] - topLeft[0])
    .attr("height", bottomRight[1] - topLeft[1])
    .style("left", topLeft[0] + "px")
    .style("top",  topLeft[1] + "px");
    // .select("g")
  g
    .attr("transform",
	  "translate(" + -topLeft[0] + "," + -topLeft[1] + ")")
    .selectAll("g path")
    .attr("d", path);
}
