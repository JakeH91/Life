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
    (T0005) Regenerate leaves over time.
    <!-- (T0006) Background colour change according to time passed (to simulate day and night). (29/10/17) -->
        ISSUES:
            <!-- (I0004): Color change clunky. Change to fade. (30/10/17) -->
            <!-- (I0005): Life forms look as bright at any time of day. Overlay the color change with high opacity. (30/10/17) -->
    <!-- (T0007) Adjust sight capability to time of day. (29/10/17) -->
        ISSUES:
            (I0006): May need to increase sight at night a bit.

29/10/17:
    (T0008) Style start life button to be displayed in the middle of the screen, large, before game begins
    (T0009) Get button to reappear if all life has ceased to exist (apart from leaves)
    (T0010) Display leaderboard on the right, with the following attributes:
        (T0010a) Name of life form,
        (T0010b) Species,
        (T0010c) Health bar,
        (T0010d) Sight,
        (T0010e) Speed
    <!-- (T0011) Fade seamlessly between decay images (instead of clunky changes) (30/10/17) -->
    (T0012) If sight is below a certain level, creatures should preserve energy (sleep)
    (T0013) Carnies should be able to start eating herbies if there are touching at all, not just if there centres are equal