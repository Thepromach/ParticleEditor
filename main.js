

/**
 * Sending error to error_box
 * @param {String} error Error message that we want to send
 * @param {Array<Number>} error_box Div that we want to append the error message
 */
function sendErrorMessage(error, error_box){
  error_box.hidden = false;
  var error_message = document.createElement("p");
  error_message.innerHTML = error;
  error_box.appendChild(error_message);
}


var My_Menu = {
    props: ["title"],
    template: `<div class="menu" v-bind:id="title"><transition name="fade"><div v-show="show">
                    <h2 v-on:mouseup="stopDrag" v-on:mousedown="startDrag"><button v-on:click="deleteEmitter">X</button> Emitter: {{title}}</h2>
                    <p>X: {{emitter.x}} Y: {{emitter.y}}</p> <p> <input v-model.number="emitter.x" class="slider" type="range" min="-2.0" max="2.0" step="0.1">
                    <input v-model.number="emitter.y" class="slider"  type="range" min="-2.0" max="2.0" step="0.1"></p>
                    <div>Width: <input v-model.number="emitter.width" class="slider"  type="range" min="0.01" max="2.0" step="0.01"></div>
                    <div>Height: <input v-model.number="emitter.height" class="slider"  type="range" min="0.01" max="2.0" step="0.01"></div>
                    Spawn Delay: <input v-model.number="emitter.spawn_time" @keyup="spawnTimeValid" min="0.01">
                    <h3 v-on:click="hideParticle">
                      <span  v-if="hidden">&#8680;</span >
                      <span v-else>&#8681;</span>
                    Particle</h3>
                    <div v-bind:id="title + '_par'" hidden>
                      <img width="20px" :src="'https://picsum.photos/1024/1024?image='+textures[emitter.image_id].id">
                      <select v-model.number="emitter.image_id">
                          <option v-for="n in textures.length" :selected="n==1" :value="n-1">
                            {{n}}
                            {{textures[n-1].name}}
                          </option>
                      </select>
                      <div><span class="left-tag">Width:</span> <input v-model.number="emitter.particle_width" class="slider"  type="range" min="0.01" max="1.0" step="0.01"></div>
                      <div><span class="left-tag">Height:</span> <input v-model.number="emitter.particle_height" class="slider"  type="range" min="0.01" max="1.0" step="0.01"></div>
                      <div><span class="left-tag">DirX: {{emitter.dirX0}}</span> <input v-model.number="emitter.dirX0" class="slider" type="range" min="-1.0" max="1.0" step="0.1"></div>
                      <div><span class="left-tag">Range: {{emitter.dirX1}}</span> <input v-model.number="emitter.dirX1" class="slider" type="range" min="-1.0" max="1.0" step="0.1"></div>
                      <div><span class="left-tag">DirY: {{emitter.dirY0}}</span> <input v-model.number="emitter.dirY0" class="slider" type="range" min="-1.0" max="1.0" step="0.1"></div>
                      <div><span class="left-tag">Range: {{emitter.dirY1}}</span> <input v-model.number="emitter.dirY1" class="slider" type="range" min="-1.0" max="1.0" step="0.1"></div>
                      <h4>Start Color:</h4>
                        <div><span class="left-tag">Red: {{emitter.start_color[0]}}</span> <input v-model.number="emitter.start_color[0]" class="slider black-to-red" type="range" min="0.0" max="1.0" step="0.05"></div>
                        <div><span class="left-tag">Green: {{emitter.start_color[1]}}</span> <input v-model.number="emitter.start_color[1]" class="slider black-to-green" type="range" min="0.0" max="1.0" step="0.05"></div>
                        <div><span class="left-tag">Blue: {{emitter.start_color[2]}}</span> <input v-model.number="emitter.start_color[2]" class="slider black-to-blue" type="range" min="0.0" max="1.0" step="0.05"></div>
                        <div><span class="left-tag">Alpha: {{emitter.start_color[3]}}</span> <input v-model.number="emitter.start_color[3]" class="slider black-to-white" type="range" min="0.0" max="1.0" step="0.05"></div>
                      <h4>End Color:</h4>
                        <div><span class="left-tag">Red: {{emitter.end_color[0]}}</span> <input v-model.number="emitter.end_color[0]" class="slider black-to-red" type="range" min="0.0" max="1.0" step="0.05"></div>
                        <div><span class="left-tag">Green: {{emitter.end_color[1]}}</span> <input v-model.number="emitter.end_color[1]" class="slider black-to-green" type="range" min="0.0" max="1.0" step="0.05"></div>
                        <div><span class="left-tag">Blue: {{emitter.end_color[2]}}</span> <input v-model.number="emitter.end_color[2]" class="slider black-to-blue" type="range" min="0.0" max="1.0" step="0.05"></div>
                        <div><span class="left-tag">Alpha: {{emitter.end_color[3]}}</span>  <input v-model.number="emitter.end_color[3]" class="slider black-to-white" type="range" min="0.0" max="1.0" step="0.05"></div>
                    </div>
                </div></transition></div>`,
    data() {
        e = new Emitter();
        var canvas = document.getElementById("glCanvas").__vue__.$data;  //Getting $data of canvas so that we can add emitters there
        var t = canvas.textures;                                         //getting textures that canvas has loaded
        canvas.emitters[canvas.emitters.length] = e;                     //pushing this menus emitter to canvas emitter list
        return {
            drag: false,
            position: {x : 0 , y : 0},
            emitter : e,
            textures : t,
            hidden : true,
            show : false
        };
    },


    /**
      * Mounting menu and starting animation by setting show to true
    */
    mounted : function() {
      this.show = true;
    },

    methods: {


        /**
          * Stop moving the menu
          * @param {MouseEvent} event Mouse event info
        */
        stopDrag: function(event){
            this.drag = false;
        },

        /**
          * Start moving the menu
          * @param {MouseEvent} event Mouse event info
        */
        startDrag: function(event){
            this.drag = true;
            var menu = document.getElementById(this.title);
            var rect = menu.getBoundingClientRect();

            this.position.y = rect.top - event.clientY;
            this.position.x = rect.left - event.clientX;
        },

        /**
          * Move menu when drag is true
          * @param {MouseEvent} event Mouse event info
        */
        move: function(event){
            if(this.drag){
                var menu = document.getElementById(this.title);
                menu.style.top = String(event.clientY + this.position.y);
                menu.style.left = String(event.clientX + this.position.x);
            }
        },

        /**
          * Toggle particle part of menu
        */
        hideParticle : function(event){
            var particle_menu = document.getElementById(this.title + "_par");
            particle_menu.hidden = !particle_menu.hidden;
            this.hidden = !this.hidden;

        },

        /**
          * Deleting emitter and this menu
        */
        deleteEmitter : function(event){
          this.emitter.running = false;
          this.$el.parentNode.removeChild(this.$el);

        },

        /**
          * Checking that user has given valid spawn time
        */
        spawnTimeValid : function(){
          var error_box = document.getElementById("errorBox");
          while(error_box.firstChild){
            error_box.removeChild(error_box.firstChild);
          }
          if(isNaN(this.emitter.spawn_time)){
            sendErrorMessage("Spawn delay must be number",error_box);
            this.emitter.spawn_time = 0;
            return;
          }
          else if(this.emitter.spawn_time < 0){
            sendErrorMessage("Spawn delay must be positive", error_box);
            this.emitter.spawn_time = 0;
            return;
          }
          error_box.hidden = true;
          this.emitter.timer = 0;
        }
    }
};


Vue.component('gl_canvas',{
    props: ["id"],
    template: '<canvas v-bind:id="id"></canvas>',
    data () {
        return {
            gl : undefined,
            vertices : [
                -0.5,0.5,
                -0.5,-0.5,
                0.5,-0.5,
                0.5,0.5
            ],

            indices : [3,2,1,3,1,0],

            textureCoord : [
                0.0,  0.0,
                0.0,  1.0,
                1.0,  1.0,
                1.0,  0.0,
            ],

            textures : new Array(),

            shader : undefined,

            vertex_buffer : undefined,
            index_buffer : undefined,
            texture_buffer : undefined,
            emitters : new Array(),
            then : 0,
        };
    },

    /**
      * Mounting gl_canvas and starting to load images and names for those images
    */
    mounted  : function(){
      var canvas = document.getElementById("glCanvas");
      this.gl = canvas.getContext("webgl"); //creating webgl context
      if (!this.gl) {  //testing if there is webgl context

          var error_box = document.getElementById("errorBox");
          error_box.hidden = false;
          var error_message = document.createElement("p");
          error_message.innerHTML = "Unable to initialize WebGL. Your browser or machine may not support it."
          error_box.appendChild(error_message);
          return;
      }

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", "https://picsum.photos/list", true);  //Images list from picsum
      xmlhttp.onreadystatechange = (function(self) {
          return function(){
              if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                  var jsonObj = JSON.parse(xmlhttp.responseText);
                  var i = 0;
                  var counter = 0;
                  while(self.$data.textures.length < 5){         //We want get only 5 textures
                      i = Math.floor(Math.random() * jsonObj.length);   //random number that is between 0 and images list lenght
                      var xmlhttp2 = new XMLHttpRequest();

                      xmlhttp2.open("GET", "https://api.imagga.com/v2/tags?image_url=" + "https://picsum.photos/1024/1024?image=" + jsonObj[i].id); //Using imagga to recognize that image is about
                      xmlhttp2.setRequestHeader("accept","application/json");
                      xmlhttp2.setRequestHeader("authorization","Basic YWNjX2JiODIxNjM3MDI5OWU2MjplY2YwMDliM2QyN2MzZDliYTlmMGMyZGNlMDk5ODY4Zg==");

                      xmlhttp2.onreadystatechange = (function(self, i){
                          return function(){
                              if(self.readyState == 4 && self.status == 200){
                                  var jsonObj2 = JSON.parse(self.responseText);
                                  canvas.__vue__.textures[i].name = jsonObj2.result.tags[0].tag.en;  //Most likely english word to descripe this images
                              }
                              else if(self.status == 403){ //We probably send request to close to each other or we reach usage limit
                                var error_box = document.getElementById("errorBox");
                                sendErrorMessage("Failed to get texture name from imagga", error_box);
                              }
                          }
                      })(xmlhttp2, counter);

                      setTimeout((function(xmlhttp2) {
                        return function(){
                          xmlhttp2.send();
                        }
                      })(xmlhttp2), 1000 * counter); //Having timeout so that we don't pass too many at same time as free user
                      counter++;
                      self.$data.textures.push({name : "unknown", filename : jsonObj[i].filename, id : jsonObj[i].id,
                                                opengl_id: self.loadTexture(self.$data.gl, "https://picsum.photos/1024/1024?image=" + jsonObj[i].id)});
                  }

                  window.requestAnimationFrame(canvas.__vue__.drawFrame);  //we should be ready to start rendering
              }
          }
      })(this);
      xmlhttp.send();

      this.gl.viewport(0,0,canvas.width,canvas.height); //setting viewport
      this.gl.enable(this.gl.BLEND); //enable blend
      this.gl.depthMask(false); //disable depth mask


      //setting blend function that bend images to background
      this.gl.blendFuncSeparate(this.gl.SRC_ALPHA, this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA, this.gl.ONE);
      this.gl.blendEquation(this.gl.FUNC_ADD);


      this.vertex_buffer = this.gl.createBuffer(); //creating buffer for verteces
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_buffer); //using vertex buffer
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW); //setting vectices to buffer
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); //unbind vectex_buffer

      this.index_buffer = this.gl.createBuffer(); //creating buffer for indices
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index_buffer); //using index buffer
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW); //setting indices to buffer
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null); //unbind index buffer

      this.texture_buffer = this.gl.createBuffer(); //creating buffer for texture coordinates
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texture_buffer); //using texture buffer
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.textureCoord), this.gl.STATIC_DRAW); //setting texture coordinates to buffer
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null); //unbind texture buffer


      this.createShader();//create shader

    },
    methods : {
        /**
          * Creating shaders
        */
        createShader : function(){

            if(!this.gl){
              var error_box = document.getElementById("errorBox");
              sendErrorMessage("WebGlContext wasn't initiated or was deleted some reasong?", error_box);
              return;
            }

            var vertCode =
                'attribute vec2 textureCoord;' +        //texture coordinates using indeces
                'attribute vec2 coordinates;' +         //vertex coordinates using indeces
                'varying vec2 vTextureCoord;' +         //vertex texture coordinate

                'uniform vec2 position;' +              //position uniform
                'uniform vec2 scale;' +                 //scale uniform

                'void main(void) {' +
                    ' gl_Position = vec4(coordinates * scale, 0.0, 1.0) + vec4(position,0.0,1.0);' + //calculating position
                    ' vTextureCoord = textureCoord;' +      //giving texture coordinate to fragShader
                '}';

            var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER); //creating vertext shader
            this.gl.shaderSource(vertShader, vertCode); //setting code to vectext shader
            this.gl.compileShader(vertShader);   //compiling shader code
            var log = this.gl.getShaderInfoLog(vertShader); //getting vertex shader log for error debugging
            if(log.length != 0)console.log(log);    //printing log if log is not empty

            var fragCode =
                'precision mediump float;'+         //setting precision
                'varying vec2 vTextureCoord;'+      //texture coordinates
                'uniform vec4      color;'+         //color uniform
                'uniform sampler2D texture;' +      //texture uniform

                'void main(void) {' +
                    ' vec4 texture_color = texture2D(texture, vTextureCoord);' + //getting texture color
                    ' gl_FragColor = texture_color * color;' + //multiplying texture color with color
                '}';


            var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER); //creating fragment shader
            this.gl.shaderSource(fragShader, fragCode); //setting code to fragment shader
            this.gl.compileShader(fragShader);   //compiling fragment shader

            log = this.gl.getShaderInfoLog(fragShader); //getting fragment shader log for error debugging
            if(log.length != 0)console.log(log);  //printing log ig log is not empty

            var shaderProgram = this.gl.createProgram(); //creating shader program
            this.gl.attachShader(shaderProgram, vertShader); //setting vertex shader to program
            this.gl.attachShader(shaderProgram, fragShader); //setting fragment shader to program
            this.gl.linkProgram(shaderProgram); //linking shaders


            this.shader = { //creating shader program and getting shader variables locations
                program: shaderProgram,
                texture_uniform: this.gl.getUniformLocation(shaderProgram, "texture"),
                textureCoord: this.gl.getAttribLocation(shaderProgram, "textureCoord"),
                coord: this.gl.getAttribLocation(shaderProgram, "coordinates"),
                position: this.gl.getUniformLocation(shaderProgram, "position"),
                scale: this.gl.getUniformLocation(shaderProgram, "scale"),
                color: this.gl.getUniformLocation(shaderProgram, "color")
            };

        },

        /**
          * Draw frame
          * @param {Number} now Current time
        */
        drawFrame : function(now){

            if(!this.gl){
              var error_box = document.getElementById("errorBox");
              sendErrorMessage("WebGlContext wasn't initiated or was deleted some reasong?", error_box);
              return;
            }

            now *= 0.001; //make sure now is nanoseconds
            const deltaTime = now - this.then; //create deltaTime
            this.then = now; //set last time

            this.gl.useProgram(this.shader.program); //use shader program
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0); //set clear color to white
            this.gl.clear(this.gl.COLOR_BUFFER_BIT); //clear color buffer


            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index_buffer); //set indices
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texture_buffer); //binds texture coordinates
            this.gl.vertexAttribPointer(this.shader.textureCoord, 2, this.gl.FLOAT, false, 0,0); //set shader textureCoord
            this.gl.enableVertexAttribArray(this.shader.textureCoord); //enable textureCoord

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_buffer); //bind vertices
            this.gl.vertexAttribPointer(this.shader.coord, 2, this.gl.FLOAT, false, 0, 0); //set shader coord
            this.gl.enableVertexAttribArray(this.shader.coord); //enable coord


            this.gl.activeTexture(this.gl.TEXTURE0); //active texture 0
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0].opengl_id); //bind current texture
            this.gl.uniform1i(this.shader.texture_uniform, 0);


            for(var ii = 0; ii < this.emitters.length; ii++){
                var emitter = this.emitters[ii];

                if(!emitter.running){
                  this.emitters.splice(ii,1);
                }

                if(emitter.spawn_time < 0.01){
                  continue;
                }


                this.gl.activeTexture(this.gl.TEXTURE0); //active texture 0
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[emitter.image_id].opengl_id); //bind current texture
                this.gl.uniform1i(this.shader.texture_uniform, 0); //tell shader that we want this texture to be texture_uniform


                emitter.timer += deltaTime; //update emitter timer
                while(emitter.timer >= (emitter.spawn_time) ){ //loop until we don't have emitter time left
                    new Particle(emitter); //spawn particle
                    emitter.timer -= emitter.spawn_time; //reducing timer
                }

                for(i = 0; i < emitter.particles.length; i++){ //loop all particles

                    emitter.particles[i].fadeToColor(emitter.particles[i].color, emitter.end_color, deltaTime, emitter.color_fade_time); //update color
                    emitter.particles[i].x += emitter.particles[i].dirX * deltaTime; //update X position
                    emitter.particles[i].y += emitter.particles[i].dirY * deltaTime; //update Y position
                    emitter.particles[i].live_time -= 1 * deltaTime; //update live time
                    if(emitter.particles[i].live_time <= 0){ //check if particle is live
                        emitter.particles.splice(i, 1); //delete particle
                        i--;
                        continue;
                    }

                    var position = [emitter.particles[i].x + parseFloat(emitter.x), emitter.particles[i].y + parseFloat(emitter.y)]; //create position array
                    this.gl.uniform2fv(this.shader.position, position); //set shader position

                    var scale = [emitter.particles[i].width, emitter.particles[i].height]; //create scale array
                    this.gl.uniform2fv(this.shader.scale, scale); //set scale

                    var color = emitter.particles[i].color; //create color array
                    this.gl.uniform4fv(this.shader.color, color); //set color

                    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT,0); //draw particle
                }
            }

            window.requestAnimationFrame(this.drawFrame); //request next frame

        },

        /**
          * Load texture to graphics card
          * @param {WebGLRenderingContext} gl WebGL context
          * @param {String} url Image url that we want to load
        */
        loadTexture : function(gl, url) {
            const texture = gl.createTexture(); //create texture
            gl.bindTexture(gl.TEXTURE_2D, texture); //bind texture for use

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                          new Uint8Array([255, 255, 255, 255])); //Fill texture with 1 white pixel
            if(url != ""){ //if url is not empty we want load image
                var img = new Image(); //create new image
                img.addEventListener('load', function() { //add load function
                    gl.bindTexture(gl.TEXTURE_2D, texture); //bind texture for use
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); //set image to texture
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); //we want to wrap to edge all cases
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); //also use linear filtering
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                });
                img.crossOrigin = ""; //We are okey whit cross Origin images even to webGL doesn't like that
                img.src = url; //set image src to url
            }

            gl.bindTexture(gl.TEXTURE_2D, null); //unbind the texture (propably unnessery in this case)
            return texture;
        }


    }
});


var app = new Vue({
    el: '#app',
    data: {
        gl : undefined,
        counter : 0,
        componentClass : undefined,
    },
    /**
      * Mounting the app and creaing menu class
    */
    mounted : function(){
        this.componentClass = Vue.extend(My_Menu); //create component class
        setTimeout(this.setMenu, 100); //wait little bit so that textures maybe ready
    },
    methods: {

      /**
        * Checking if we can create menu and creating menu if we can
      */
        setMenu : function(){
          var textures = document.getElementById("glCanvas").__vue__.$data.textures;

          if(textures.length < 5){ //if textures are not ready let's wait little longer
            setTimeout(this.setMenu, 100);
            return
          }

          this.createMenu();
        },

        /**
          * Create menu and emitter
        */
        createMenu : function(){
          var instance = new this.componentClass({
              propsData: {title : this.counter}
          });
          this.counter++;
          instance.$mount();
          this.$el.appendChild(instance.$el);
        },

        /**
          * Passing mouse movement to menus
          * @param {MouseEvent} event Mouse event info
        */
        move : function(event){
            menus = document.getElementsByClassName("menu");
            if(menus){
                for(var i = 0; i < menus.length; i++){
                    if(menus[i].__vue__.move != undefined) //if menu bugged we don't want to try to call function that doesn't exist
                      menus[i].__vue__.move(event);
                }
            }
        },

    },
});
