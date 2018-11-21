class Emitter{
    constructor (){
        this.running = true;
        this.x =  -0.1;
        this.y =  -1.0; //position
        this.width =  0.5;
        this.height = 0.5; //size
        this.timer =  0;
        this.spawn_time = 0.5;
        this.dirX0 =  0.0;
        this.dirX1 = 0.0; //particle direction x
        this.dirY0 = 0.2;
        this.dirY1 = 0.0; //particle direction y
        this.particle_live_time = 10;
        this.particle_width = 0.5;
        this.particle_height = 0.5;
        this.image_id = 0;            //texture_id
        this.particles = [];          //all the particles that are create by this emitter
        this.color_fade_time = 0.1;   //fading speeed
        this.start_color = [0.7, 0.3, 0.3, 1.0]; //particle starting color
        this.end_color =  [0.2, 0.2, 0.0, 1.0]; //particle ending color
    }
}
