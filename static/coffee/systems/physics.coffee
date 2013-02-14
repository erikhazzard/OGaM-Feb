#============================================================================
#
#Systems - Physics
#   Handles entity physics
#
#============================================================================
define([], ()->
    #Nasty, hardcoded canvas for now    
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d')
    
    class Physics
        constructor: (entities)->
            @entities = entities
            return @
        
        tick: (delta)->
            for id, entity of @entities.entitiesIndex['position']
                #Call the physics component's tick function, which will
                #  update the entity's position component
                entity.components.physics.applyForce(
                    entity.components.physics.seekForce(@entities.entities['0'])
                )
                entity.components.physics.tick(delta)
            
    return Physics
)
