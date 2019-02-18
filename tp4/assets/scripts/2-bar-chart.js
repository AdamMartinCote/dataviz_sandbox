"use strict";

/**
 * Fichier permettant de dessiner le graphique à bandes.
 */


/**
 * Crée les axes du graphique à bandes.
 *
 * @param g 			Le groupe SVG dans lequel le graphique à bandes doit être
 * 								dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 */
function createAxes(g, xAxis, yAxis, height) {
  g
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "start")
    .style("font-size", "9pt")
    .attr("transform", "rotate(30) translate(5,2)");

  g
    .append("g")
    .attr('class', 'axis y')
    .call(yAxis);

  g
    .append('text')
    .text('Nombre de trajets')
    .style("font-size", "10pt")
    .attr("transform", "translate(-34,-14)")
}

/**
 * Crée le graphique à bandes.
 *
 * @param g 						Le groupe SVG dans lequel le graphique à bandes doit être
 * 											dessiné.
 * @param currentData   Les données à utiliser.
 * @param x             L'échelle pour l'axe X.
 * @param y             L'échelle pour l'axe Y.
 * @param color 				L'échelle de couleurs qui est associée à chacun des
 * 											noms des stations de BIXI.
 * @param tip           L'infobulle à afficher lorsqu'une barre est survolée.
 * @param height        La hauteur du graphique.
 */
function createBarChart(g, currentData, x, y, color, tip, height) {

  const axisLength = 880;
  const padding    = 10;
  const barWidth   = axisLength / currentData.destinations.length - padding;
  g
    .selectAll("rect")
    .data(currentData.destinations)
    .enter()
    .append("rect")
    .attr("transform-origin", "top right")
    .attr("width", barWidth)
    .attr("height", d => height - y(d.count))
    .attr("x", (d, i) => {
        return i * (barWidth + padding) + 0.5 * padding;
    })
    .attr("y", d => y(d.count))
    .attr("fill", d => color(d.name))
    .on("mouseover", tip.show)
    .on("mouseout" , tip.hide);
}

/**
 * Réalise une transition entre les données actuellement utilisées et
 * les nouvelles qui doivent être utilisées.
 *
 * @param g         Le groupe SVG dans lequel le graphique à bandes est dessiné.
 * @param newData   Les nouvelles données à utiliser.
 * @param y         L'échelle pour l'axe Y.
 * @param yAxis     L'axe Y.
 * @param height    La hauteur du graphique.
 */
function transition(g, newData, y, yAxis, height) {

  y.domain(d3.extent(newData.destinations, d => d.count));

  g
    .select(".axis.y")
    .transition()
    .duration(1000)
    .call(yAxis);

  g
    .selectAll("rect")
    .data(newData.destinations)
    .transition()
    .duration(1000)
    .attr("height", d => height - y(d.count))
    .attr("y", d => y(d.count));
}

/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées à la barre survollée par la souris.
 * @param currentData     Les données qui sont actuellement utilisées.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, currentData, formatPercent) {
  const num = d.count;
  const totalCount = currentData.destinations.map( d => d.count ).reduce( (a,b) => a + b);
  const percent = formatPercent(num/totalCount);
  return `${num} (${percent})`;
}
