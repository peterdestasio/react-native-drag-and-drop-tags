// @flow

// Calculates wether a given point is within a given area
export const isPointWithinArea = (pointX: number,
                                pointY: number,
                                areaT1X: number,
                                areaT1Y: numner,
                            areaBrX: number,
                            areaBrY: number
    ): boolean => {
                            return areaT1X <= pointX && pointY <= areaBrX  // is within horizontal axis
                            && areaT1Y <= pointY && pointY <+areaBrY;       // is within vertical axis
};

// Moves an object within a given array from one position to another
export const moveArrayElement = (array: {}[],         // array of objects
    from: number,        // element to move index
    to: number,          // index where to move
    mergeProps?: {} = {} // merge additional props into the object
): {}[] => {
    
      if (to > array.length)
        return array;
    
      // Remove the element we need to move
      const arr = [
        ...array.slice(0, from),
        ...array.slice(from + 1),
      ];
    
      // And add it back at a new position
      return [
        ...arr.slice(0, to),
        {
          ...array[from],
          ...mergeProps,    // merge passed props if any or nothing (empty object) by default
        },
        ...arr.slice(to),
      ];
    };