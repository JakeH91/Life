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
    (T0010) Display leaderboard on the right, with the following attributes:
        (T0010a) Name of life form,
        (T0010b) Species,
        (T0010c) Health bar,
        (T0010d) Sight,
        (T0010e) Speed
    <!-- (T0011) Fade seamlessly between decay images (instead of clunky changes) (30/10/17) -->
    <!-- (T0012) If sight is below a certain level, creatures should preserve energy (sleep) (30/10/17) -->
    <!-- (T0013) Carnies should be able to start eating herbies if there are touching at all, not just if there centres are equal (30/10/17) -->
        ISSUES:
            (I0008) The edge of the creature still has to touch the center of it's food... Maybe that's fine, I need to think about it.

30/10/17:
    <!-- (T0014) Creatures should start small, then grow as they eat (Size proportional to health). (30/10/17) -->
    (T0015) Carnies should damage herbies before eating them entirely.

31/10/17:
    <!-- (T0016) Refactor All Code (31/10/17) -->
        ISSUES:
            (I0009) Herbies not being removed when carnies eat them.