import { MyChecker } from "./MyChecker.js";
import { MyTile } from "./MyTile.js";

export class MyBoard {
    constructor(scene, size){
        this.scene = scene;

        this.board = [];
        this.size = size;

        this.x = 10.75;
        this.y = 0.1;
        this.z = 42;

        // Initialize the board
        this.initBoard()

    }

    /**
     * Initializes the board
     * Alternates between light and dark tiles, starting with light
     */
    initBoard(){
        let light = true;
        let row = 0;
        let col = 0;
        let tiles = [];

        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++){
                var id = i + "," + j;
                tiles.push(new MyTile(this.scene, id,  this, row, col, light, null));
                light = !light;
                col++;
            }
            light = !light;
            row++;
            col = 0;
        }

        this.initTiles(tiles);

        this.initCheckers();

    }
    /**
     * Given a 1D array of tiles, initializes the board with them, in the correct order
     * @param {MyTile[]} tiles 1D array of tiles
     */
    initTiles(tiles) {
        for (let i = 0; i < this.size; i++){
            this.board.push([]);
            for (let j = 0; j < this.size; j++){
                this.board[i].push(tiles[i*this.size + j]);
            }
        }
    }

    /**
     * Initializes the checkers
     * Rows 0, 1, 2, 5, 6, 7 have checkers, with a distance of 1 between them
     * Rows 3 and 4 are empty
     * */
    initCheckers(){
        for (var row = 0; row < this.size; row++){
            for (var col = 0; col < this.size; col++){
                /* Row 3 and 4 are empty */
                if (row < 3 || row > 4){
                    /* Checkers are placed with a distance of 1 between them */
                    if (col % 2 == 0 && row % 2 != 0 || col % 2 != 0 && row % 2 == 0){
                        let color = "white";
                        if (row < 3)
                            color = "black";

                        let checker = new MyChecker(this.scene, color, row, col, this, row + "," + col);
                        this.addChecker(row + "," + col, checker);
                    }
                }
            }
        }

    }


    /**
     * Add a tile to the board
     * @param {MyTile} tile tile to be added
     * @throws {Error} if the tile is already in the board
     */
    addTile(tile){
        if (this.board[tile.row][tile.col] != null)
            console.error("Tile already in the board");
        this.board[tile.row][tile.col] = tile;
    }

    /**
     * Adds a checker to a given tile
     * @param {String} tile_id id of the tile
     * @param {MyChecker} checker checker to be added
     * @throws {Error} if there is already a checker in the tile
     * */

    addChecker(tile_id, checker){
        /* Assumes id is a string with the format "row,col" */

        let row = parseInt(tile_id[0]);
        let col = parseInt(tile_id[2]);

        if (this.board[row][col].checker != null)
            console.error("There is already a checker in this tile");

        this.board[row][col].set(checker);
    }

    /**
     * Removes a checker from a given tile
     * @param {String} tile_id id of the tile
     * @throws {Error} if there is no checker in the tile
     */
    removeChecker(tile_id){
        /* Assumes id is a string with the format "row,col" */

        let row = parseInt(tile_id[0]);
        let col = parseInt(tile_id[2]);

        if (this.board[row][col].checker == null)
            console.error("No checker in this tile");

        this.board[row][col].remove();
    }

    /**
     * Gets a checker from a given tile
     * @param {String} tile_id id of the tile
     * @returns {MyChecker} checker in the tile
     * @throws {Error} if there is no checker in the tile
     */

    getChecker(tile_id){
        /* Assumes id is a string with the format "row,col" */

        let row = parseInt(tile_id[0]);
        let col = parseInt(tile_id[2]);

        if (this.board[row][col].checker == null)
            console.error("No checker in this tile");

        return this.board[row][col].get();
    }

    /**
     * Gets a tile from a given checker
     * @param {String} checker_id id of the checker
     * @returns {MyTile} tile with the checker
     */
    getTile(checker_id){
        for (let i = 0; i < this.board.length; i++){
            for (let j = 0; j < this.board[i].length; j++){
                if (this.board[i][j].checker != null && this.board[i][j].checker.id == checker_id)
                    return this.board[i][j];
            }
        }
    }

    /**
     * Gets a tile from a given position
     * @param {Integer} x row of the tile
     * @param {Char} y column of the tile
     * @returns {MyTile} tile in the given position
     * */
    getTileByCoords(x, y){
        // Assumes a coordinate system A-H and 0-7
        let row = x;
        let col = y.charCodeAt(0) - 65;

        return this.board[row][col];
    }


    /**
     * Gets a tile from a given position
     * @param {Integer} row row of the tile
     * @param {Integer} col column of the tile
     * @returns {MyTile} tile in the given position
     * */
    getTile(row, col){
        return this.board[row][col];
    }

    /**
     * Moves a checker from a tile to another
     * @param {MyChecker} checker checker to be moved
     * @param {MyTile} oldTile tile where the checker is
     * @param {MyTile} newTile tile where the checker will be
     * */
    moveChecker(checker, oldTile, newTile){
        this.removeChecker(oldTile.id);
        this.addChecker(newTile.id, checker);
    }

    /**
     * Displays the board
     * */
    display(){
        var id = 0;
        for (let i = 0; i < this.board.length; i++){
            for (let j = 0; j < this.board[i].length; j++){
                this.scene.registerForPick(id, this.board[i][j]);
                this.board[i][j].display();
                id++;
            }
        }
    }

}