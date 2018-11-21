class Particle{
    /**
     *
     * @param {Emitter} e Emitter that owns this particle
     */
    constructor(e){
        this.x = ((Math.random() * e.width)); //X position somewhere in emitters area
        this.y = ((Math.random() * e.height)); //Y position somewhere in emitters area
        this.live_time = e.particle_live_time;
        this.width = e.particle_width;
        this.height = e.particle_height;
        this.dirX = ((Math.random() * parseFloat(e.dirX1)) + parseFloat(e.dirX0)); //particle X direction
        this.dirY = ((Math.random() * parseFloat(e.dirY1) + 1) * parseFloat(e.dirY0)); //particle Y direction/speed

        this.color = [];

        for(var i = 0; i < e.start_color.length; i++){
          this.color[i] = parseFloat(e.start_color[i]);
        }

        e.particles[e.particles.length] = this; //add particle to emitters particle array
    }

    /**
     * Fade from color_a to color_b by delta * color_fade_time
     * @param {Array<Number>} color_a Current color
     * @param {Array<Number>} color_b End color
     * @param {Number} delta Delta time
     * @param {Number} color_fade_time How much color will fade related to delta
     */
    fadeToColor(color_a, color_b, delta, color_fade_time){
        //var color_c = [];
        //Loop all 4 colors
        for(var j = 0; j < 4; j++){
            if(color_a[j] > parseFloat(color_b[j])){
                this.color[j] = color_a[j] - delta * color_fade_time;
                if(this.color[j] < parseFloat(color_b[j])){
                    this.color[j] = parseFloat(color_b[j]);
                }
            }
            else if(color_a[j] < parseFloat(color_b[j])){
                this.color[j] = color_a[j] + delta * color_fade_time;
                if(this.color[j] > parseFloat(color_b[j])){
                    this.color[j] = parseFloat(color_b[j]);
                }
            }else{
                this.color[j] = color_a[j];
            }
        }
        //return color_c;
    }

}
