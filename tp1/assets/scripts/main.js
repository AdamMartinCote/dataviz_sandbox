(function () {
  "use strict";

  // Sélection de l'élément SVG
  var svg = d3.select("svg");

  /* TODO : trouver la fonction dans D3 permettant de trouver tous les cercles
            se trouvant dans l'élément SVG puis stocker le résultat dans la
            variable "circles".
  */
  var circles = svg.selectAll("svg circle");

  d3.select("#create-circles-button")
    .on("click", createCircles);

  d3.select("#delete-circles-button")
    .on("click", deleteCircles);

  /**
   * Mise à jour de la variable contenant les cercles ainsi que de l'affichage du nombre de cercles se trouvant
   * dans l'élément SVG.
   */
  function update() {
    /* TODO
       1) Mettre à jour la variable circles*/
    circles = svg.selectAll("svg circle");

    /* 2) Mettre à jour le texte indiquant le nombre de cercles présents dans l'élément SVG
     */
    var circlesCount = circles.nodes().length;
    d3.select("#circles-count").text(circlesCount);
  }
update()
  /**
   * Création de nouveaux cercles.
   */
  function createCircles() {
    /* TODO :
       1) Trouver comment accéder à la valeur du champ spécifiant la quantité de cercles à créer.
    */
    let numberToAdd = d3.select("#quantity").node().value;
    /*
       2) Vérifier que cette valeur est correcte.
       3) Si cette valeur est correcte, créer le nombre de cercles demandé avec une boucle for
          (utiliser la fonction generateRandomCircle()).
    */
    const MAX_CIRCLES = 100;
    if (numberToAdd < MAX_CIRCLES &&
        numberToAdd >= 1) {
      for (let i = 0; i < numberToAdd; i++) {
        svg.append(generateRandomCircle());
      }
    }
    /* 4) Si cette valeur n'est pas correcte, créer une alerte informant l'utilisateur.
    */
    else {
      alert(`Invalid value, accepted values: [1, ${MAX_CIRCLES}]`);
    }

  }

  /**
   * Suppression de tous les cercles présents dans l'élément SVG.
   */
  function deleteCircles() {
	  /* TODO :
      1) Afficher une boîte de confirmation afin de confirmer si l'utilisateur souhaite supprimer tous les cercles.
    */
    if (confirm(`Do you want to delete all circles?`)) {
    /*
	   2) Supprimer tous les cercles si l'utilisateur souhaite les supprimer, sinon ne rien faire.
    */
      svg.html("");
      update();
    }
  }

  /**
   * Génération d'un cercle dans l'élément SVG avec une position et une taille aléatoire.
   */
  function generateRandomCircle() {
    var BORDER = 10;
    var DIMENSION = 500;
    var cx = Math.random() * DIMENSION;
    var cy = Math.random() * DIMENSION;

    svg.append("circle")
      .attr("cx", function () {
        return cx;
      })
      .attr("cy", function () {
        return cy;
      })
      .attr("r", function () {
        return Math.random() * 10 + 10;
      })
      .attr("fill", function () {
        if ((cx > cy + BORDER) && (cx + cy < DIMENSION - BORDER)) return "orange";
        else if ((cx > cy + BORDER) && (cx + cy > DIMENSION + BORDER)) return "blue";
        else if ((cx < cy - BORDER) && (cx + cy < DIMENSION - BORDER)) return "purple";
        else if ((cx < cy - BORDER) && (cx + cy > DIMENSION + BORDER)) return "green";
        else return "black";
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
    update();
  }

  /**
   * Obtient le texte à afficher dans l'infobulle.
   *
   * @param radius      Le rayon du cercle.
   * @param position    La position du cercle.
   * @param color       La couleur du cercle.
   * @return {string}   Le texte à afficher dans l'infobulle.
   */
  function textTip(radius, position, color) {
    /* TODO : mettre en forme les informations pertinentes du cercle pointé
       Vous pouvez utiliser la balise <br> pour faire revenir le texte à la ligne
    */
    return `
      <p>Rayon du cercle:   ${parseInt(radius,10)   || ''}  </p><br>
      <p>Centre du cercle: (${parseInt(position[0]) || ''},
                            ${parseInt(position[1]) || ''}) </p><br>
      <p>Couleur du cercle: ${color                 || ''}      </p>
    `
  }

  let tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function () {

      /* TODO : Récupérer les informations pertinentes du cercle pointé. Ces éléments sont :
         1) Le rayon du cercle
         2) La position du cercle
         3) La couleur du cercle
       */
      let radius   = d3.select(this).attr("r");
      let position = [d3.select(this).attr("cx"),
                      d3.select(this).attr("cy")];
      let color    = d3.select(this).attr("fill");
      return textTip(radius, position, color);
    });

  svg.call(tip);
})();
