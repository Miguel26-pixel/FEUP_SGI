import { CGFobject, CGFappearance, CGFtexture } from "../../../lib/CGF.js";
import { MySphere } from "../../primitives/MySphere.js";
import { MyTorus } from "../../primitives/MyTorus.js";

export class MyChecker extends CGFobject {
  constructor(scene, color, row, col, board, tileID) {
    super(scene);

    /*
      The checker piece will be composed by 4 parts:
      - 2 torus
        - 1 outer torus
        - 1 inner torus
      - 2 spheres
        - 1 outer sphere
        - 1 sphere where all the pieces will be placed
    */
    this.parts = [];

    // Outer torus
    this.parts.push(new MyTorus(scene, "none", 0.1, 1, 40, 40));
    // Whole sphere
    this.parts.push(new MySphere(scene, "none", 1, 40, 40));
    // Inner torus
    this.parts.push(new MyTorus(scene, "none", 0.1, 1, 40, 40));
    // Inner sphere
    this.parts.push(new MySphere(scene, "none", 1, 40, 40));

    this.row = row;
    this.col = col;
    this.board = board;
    this.id = row + "," + col;

    this.x = 0.5;
    this.y = 1.1;
    this.z = 0.5;

    // Pointer to the tile where the checker is placed
    this.tileID = tileID;

    this.checkerMaterial = new CGFappearance(scene);

    this.whiteTexture = new CGFtexture(
      scene,
      "scenes/images/textures/white.png"
    );
    this.blackTexture = new CGFtexture(
      scene,
      "scenes/images/textures/grey.png"
    );

    this.color = color;

  }

  /**
   * Update the position of the checker
   * @param {Integer} newX new x position
   * @param {Integer} newY new y position
   * @param {Integer} newZ new z position
   */
  updatePosition(newX, newY, newZ) {
    this.x = newX;
    this.y = newY;
    this.z = newZ;
  }

  display() {
    this.scene.pushMatrix();

    if (this.color == "white") {
      /* Outer torus */
      this.scene.pushMatrix();

      this.checkerMaterial.setTexture(this.whiteTexture);
      this.checkerMaterial.apply();

      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.1*3, 0.1*3, 10);
      this.parts[0].display();

      this.scene.popMatrix();

      /* Whole sphere */
      this.scene.pushMatrix();

      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.1*3, 0.1*3, 0.75);
      this.parts[1].display();

      // whats the result of 0.015*50?


      this.scene.popMatrix();

      /* Inner torus */
      this.scene.pushMatrix();

      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.065*3, 0.065*3, 10);
      this.parts[2].display();

      this.scene.popMatrix();

      /* Inner sphere */
      this.scene.pushMatrix();

      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.055*3, 0.055*3, 1);
      this.parts[3].display();

      this.scene.popMatrix();

    } else if (this.color == "black") {
      /* Outer torus */
      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.1*3, 0.1*3, 10);
      this.checkerMaterial.setTexture(this.blackTexture);
      this.checkerMaterial.apply();
      this.parts[0].display();
      this.scene.popMatrix();

      /* Whole sphere */
      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.1*3, 0.1*3, 0.75);
      this.checkerMaterial.setTexture(this.blackTexture);
      this.checkerMaterial.apply();
      this.parts[1].display();
      this.scene.popMatrix();

      /* Inner torus */
      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.065*3, 0.065*3, 10);
      this.checkerMaterial.setTexture(this.blackTexture);
      this.checkerMaterial.apply();
      this.parts[2].display();
      this.scene.popMatrix();

      /* Inner sphere */
      this.scene.pushMatrix();
      this.scene.translate(this.x, this.y, this.z);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(0.055*3, 0.055*3, 1);
      this.checkerMaterial.setTexture(this.blackTexture);
      this.checkerMaterial.apply();
      this.parts[3].display();
      this.scene.popMatrix();
    }

    this.scene.popMatrix();
  }

  updateTexCoords(length_s, length_t) {
    //
  }
}