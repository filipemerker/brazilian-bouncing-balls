const colisionSystem = state => {
    let w = state.widgetSize.width;  // used many times in the loop
    let h = state.widgetSize.height;
    let x = state.x;
    let y = state.y;
    let r = state.radius;
    for (let b = 0, hs = state.bounds.length; b < hs; b++) {
        let bounds = state.bounds[b];        
        if (bounds[0]){
            let b0 = bounds[0];
            if( x - r < b0.x && y + r > b0.y && y - r < b0.y) {
                if ( b0.x > 0 && b0.x < (w * 0.33) && b0.y > (h * 0.33) && b0.y < (w * 0.45)) {                    
                    x = r + b0.x; // middle left bottom corner at acre
                    state.vy *= -1;
                } else if ( b0.x > 0 && b0.x < (w * 0.098) && b0.y > (h * 0.167) && b0.y < (w * 0.206)) {                   
                    y = r + b0.y + 1; // middle left top corner at acre
                    state.vx *= -1;
                    state.vy *= -1;
                } else {
                    x = r + b0.x;
                    state.vx *= -1;
                }
                if (state.oldAxis === x) {
                    y -= 1;
                } else {
                    state.oldAxis = x;
                }
                state.antiRebounce = false;
            }
        }
        if (bounds[1]){
            let b1 = bounds[1];
            if( x + r > b1.x && y + r > b1.y && y - r < b1.y) {
                if ( b1.x > (w * 0.555) && b1.x < (w * 0.983) && b1.y > 0 && b1.y < (w * 0.2098)) {                        
                    if (state.antiRebounce) { // Top right corner
                        state.vy *= -1;
                        state.antiRebounce = false;
                    } else {
                        state.antiRebounce = true;
                    }
                    y = b1.y + r + 1;
                    state.vy *= -1;
                }
                if (b1.x > (w * 0.604) && b1.x < (w * 0.827) && b1.y > (w * 0.665) && b1.y < (w * 0.778)) {                    
                    state.vy *= -1; // bottom right corner
                } else {
                    state.vx *= -1;
                    x = b1.x - r;
                }
                if (state.oldAxis === x) {
                    y = y - 1;
                } else {
                    state.oldAxis = x;
                }
            }
        }
    }
    if (y + r > h) {
        state.vy *= -1;
        y = h - r;
    } else if (y - r < 0) {  // added else. Cant both happen at the same time?????
        state.vy *= -1;
        y = r;
    }
    state.y = y; // set state x,y to reflect any changes.
    state.x = x; 

    return state;
}

export default colisionSystem;