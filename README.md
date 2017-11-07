Next Change to Make

26/10/17: 
    <!-- (T0001) When herbie dies, slowly decay instead of disapper. (Completed 27/10/17) -->

28/10/17:
    <!-- (T0002) Create generic die function. (Completed 29/10/17) -->
    <!-- (T0003) Create generic decay function. (Completed 29/10/17) -->
        ISSUES:
        <!-- (I0001): Above 2 functions fail with more than one of each species (causing crash) (29/10/17) -->
        <!-- (I0002): While lifeform decays, all of same species (under index of the decaying) freeze and resume movement once the decaying is removed. (29/10/17) -->
    <!-- (T0004) Generate different speeds amoungst creatures upon generation. (29/10/17) -->
        ISSUES:
            <!-- (I0003): When a creature aproaches it's prey, if the distance is not divisible by the creature's speed, it will never reach it. (29/10/17) -->
    <!-- (T0005) Regenerate leaves over time. (30/10/17) -->
    <!-- (T0006) Background colour change according to time passed (to simulate day and night). (29/10/17) -->
        ISSUES:
            <!-- (I0004): Color change clunky. Change to fade. (30/10/17) -->
            <!-- (I0005): Life forms look as bright at any time of day. Overlay the color change with high opacity. (30/10/17) -->
    <!-- (T0007) Adjust sight capability to time of day. (29/10/17) -->
        ISSUES:
            <!-- (I0006): Creatures should stop moving (lose less health) if sight drops under certain limit (30/10/17) -->
            <!-- (I0007): Animate sleep (30/10/17) -->

29/10/17:
    <!-- (T0008) Style start life button to be displayed in the middle of the screen, large, before game begins (30/10/17) -->
    <!-- (T0009) Get button to reappear if all life has ceased to exist (apart from leaves) (30/10/17) -->
    <!-- (T0010) Display leaderboard on the right, with the following attributes:
        (T0010a) Name of life form,
        (T0010b) Health bar,
        (T0010c) Sight,
        (T0010d) Speed (01/11/17) -->
    <!-- (T0011) Fade seamlessly between decay images (instead of clunky changes) (30/10/17) -->
    <!-- (T0012) If sight is below a certain level, creatures should preserve energy (sleep) (30/10/17) -->
    <!-- (T0013) Carnies should be able to start eating herbies if there are touching at all, not just if there centres are equal (30/10/17) -->

30/10/17:
    <!-- (T0014) Creatures should start small, then grow as they eat (Size proportional to health). (30/10/17) -->
    <!-- (T0015) Carnies should damage herbies before eating them entirely. (03/11/17) -->

31/10/17:
    <!-- (T0016) Refactor All Code (31/10/17) -->
        ISSUES:
            <!-- (I0009) Herbies not being removed when carnies eat them. (31/10/17) -->
            <!-- (I0010) Leaves not disappearing on reset. (01/11/17) -->
            <!-- (I0011) Creatures not growing as they eat (01/11/17)
                    SOLUTION: Was setting health = nutrition instead of health += nutrition -->
            
01/11/17
    <!-- (I0012) Food randomly disappears when other food is eaten. (01/11/17) 
            SOLUTION: Sort toEat array before removing, so it removes from the top down, not changing the index of               others as it goes. -->
    <!-- (I0013) Strange pauses in movement, possibly due to loops having to finish looping before action takes place.      (01/11/17) -->
    <!-- (T0017) REMOVED! Creatures should gain defence as they grow. -->
    <!-- (T0018) Style leaderboard (hide before game start, show during game) (03/11/17) -->
    <!-- (T0019) Make leaderboard collapsable(tuck into the side, with button (or hover maybe?) to draw out/put in again) (03/11/17) -->
    (T0020) Final scoreboard should appear at end, with following stats:
        (T0020a) Amount of food eaten
        (T0020b) Age
        (T0020c) Number of Offspring
        (T0020d) Speed
        (T0020e) Sight

04/11/17:
    <!-- (T0021) Creatures should attempt to run away if they have an active predator (04/11/17) -->
        ISSUES:
            <!-- (I0014) Creature should stop running after reached a safe distance
            (I0015) If creature has food target, at the moment, it ignores it's potentially dangerous surroundings (06/11/17) -->
    <!-- (T0022) If prey escapes, predator should reset it's target (06/11/17) -->
    <!-- (T0023) If prey escapes, it should gain defence points (upgraded task (T0017))
    (T0024) If predator catches prey, it should gain attack points (06/11/17) -->
    <!-- (T0025) Amount of health loss/gain for prey/predator is determined by defence/attack points (06/11/17) -->

07/11/17:
    (T0026) If creatures aren't being chased, are old enough, and are not too hungry, they should search for a mate.
    (T0027) If they find a mate, one should hold a baby for 1 day
    (T0028) If pregnancy if successful, a new creature should be generated at the same spot as the parent
    <!-- (T0029) Once creature reaches a certain age, speed and sight deteriorate (07/11/17) -->