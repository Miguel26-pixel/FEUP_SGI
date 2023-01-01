import { CGFappearance, CGFtexture } from "../../../lib/CGF.js";
import {MyChecker} from "./MyChecker.js";
import {MyCube} from "../../primitives/MyCube.js";
import { MyRectangle } from "../../primitives/MyRectangle.js";

export class MyTile {
    constructor(scene, id, board, row, col, color, checker) {
        this.scene = scene;
        this.id = id;

        this.row = row;
        this.col = col;

        // Pointer to the board
        this.board = board;
        this.color = color;

        // Each tile is separated by 0.1 unit
        this.x = this.board.x + this.col;
        this.y = 0.1;
        this.z = this.board.z + this.row;

        this.tile = new MyCube(this.scene);

        this.hasChecker = checker != null;

        // Pointer to the checker in the tile, if there is one
        this.checker = (this.hasChecker) ? checker : null;


        this.available = false;

        // Create a bright green material for the border
        this.borderMaterial = new CGFappearance(scene);
        this.borderMaterial.setAmbient(0, 1, 0, 1);
        this.borderMaterial.setDiffuse(0, 1, 0, 1);
        this.borderMaterial.setSpecular(0, 1, 0, 1);
        this.borderMaterial.setShininess(10.0);


        var textureID = (color) ? "light_wood.png" : "dark_wood.png";
        var texture = new CGFtexture(scene, "scenes/images/textures/" + textureID);

        this.availableMaterial = new CGFappearance(scene);
        this.availableMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.availableMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.availableMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.availableMaterial.setShininess(0.0);
        this.availableMaterial.setTexture(texture);

        this.normalMaterial = new CGFappearance(scene);
        this.normalMaterial.setTexture(texture);
    }

    /**
     * Set a checker in the tile
     * @param {MyChecker} cheker
     */
    set(checker){
        this.checker = checker;
        this.hasChecker = true;
    }

    /**
     * Get the checker of the tile
     * @returns {MyChecker}
     */
    get(){
        if (this.checker == null) {
            console.error("No checker in this tile");
        }

        return this.checker;
    }

    /**
     * Remove the checker from the tile
     * @returns
     * @throws {Error} if there is no checker in the tile
     */
    remove(){
        if (this.checker == null) {
            console.error("No checker in this tile");
        }
        this.checker = null;
        this.hasChecker = false;
    }

    displayBorder(){
        for (var i = 0; i < 4; i++) {
            this.scene.pushMatrix();
            this.scene.translate(0, 1, 0);
            this.scene.rotate(i * Math.PI / 2, 0, 1, 0);
            this.scene.scale(1, 0.1, 1);
            this.borderMaterial.apply();
            this.border[i].display();
            this.scene.popMatrix();
        }
    }

    /**
     * Get the tile's x coordinate
     * @returns {number} x coordinate
    */
    getX(){
        return this.board.x + this.col;
    }

    /**
     * Get the tile's z coordinate
     * @returns {number} z coordinate
     */
    getZ(){
        return this.board.z + this.row;
    }

    /**
     * Display the tile
     */
    display(){
        if (this.id == "4,5" && this.hasChecker){
            console.log(this.hasChecker)
        }
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(1, 0.1, 1);

        (this.available) ? this.availableMaterial.apply() : this.normalMaterial.apply();

        this.tile.display();
        /* this.displayBorder(); */
        if (this.hasChecker) {
            // ! Pick ID start with 1, ex: tile at 0,0 has pick ID 1
            // ! So the pick ID is the row * board size + col + 1
            var checkerId = this.row * this.board.size + this.col + 1;
            this.scene.registerForPick(checkerId, this.checker);
            this.checker.display();
        }
        this.scene.popMatrix();
    }

    /** If a tile is available,  the material is changed to a brighter color */
    setAvailable() {
        this.available = true;
    }

    unsetAvailable() {
        this.available = false;
    }
}