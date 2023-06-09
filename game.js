kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor: [0, 0, 0, 1],
  })
  
  // Speed identifiers
  const MOVE_SPEED = 120
  const JUMP_FORCE = 360
  const BIG_JUMP_FORCE = 550
  let CURRENT_JUMP_FORCE = JUMP_FORCE
  const FALL_DEATH = 400
  const ENEMY_SPEED = 20
  
  // Game logic
  
  let isJumping = true
  
  loadRoot('https://i.imgur.com/')
  loadSprite('coin', 'wbKxhcd.png')
  loadSprite('evil-shroom', 'KPO3fR9.png')
  loadSprite('brick', 'pogC9x5.png')
  loadSprite('block', 'M6rwarW.png')
  loadSprite('mario', 'Wb1qfhK.png')
  loadSprite('mushroom', '0wMd92p.png')
  loadSprite('surprise', 'gesQ1KP.png')
  loadSprite('unboxed', 'bdrLpi6.png')
  loadSprite('pipe-top-left', 'ReTPiWY.png')
  loadSprite('pipe-top-right', 'hj2GK4n.png')
  loadSprite('pipe-bottom-left', 'c1cYSbt.png')
  loadSprite('pipe-bottom-right', 'nqQ79eI.png')
  
  loadSprite('blue-block', 'fVscIbn.png')
  loadSprite('blue-brick', '3e5YRQd.png')
  loadSprite('blue-steel', 'gqVoI2b.png')
  loadSprite('blue-evil-shroom', 'SvV4ueD.png')
  loadSprite('blue-surprise', 'RMqCc1G.png')
  
  
  
  scene("game", ({ level }) => {
    layers(['bg', 'obj', 'ui'], 'obj')
  
    const maps = [
      [
        '                                               ',
        '                                               ',
        '                                               ',
        '                                               ', 
        '                                               ',
        '             %      ==*==           r             ',
        '                                               ',
        '                                               -+    ',
        '               ^            ^               ^  ()    ',
        '========================================   =========    ',
      ],
      [
        '£                                       £',
        '£                              l         £',
        '£                                       £',
        '£                                      £',
        '£                                       £',
        '£        u        t          x x        £',
        '£                          x x x        £',
        '£                        x x x x  x   -+£',
        '£               z   z  x x x x x  x   ()£',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
      ]
    ]
  
    const levelCfg = {
      width: 20,
      height: 20,
      '=': [sprite('block'), solid()],
      '$': [sprite('coin'), 'coin'], 
      '%': [sprite('surprise'), solid(), 'coin-surprise'],//change this value here but keep the same sprite, can edit what pops up this way. note the mushroom implementation below
      '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
      'r': [sprite('surprise'), solid(), 'research-surprise'],
      'p': [sprite('surprise'), solid(), 'info-suprise'],
      'u': [sprite('surprise'), solid(), 'info-unrealEngine'],
      'l': [sprite('surprise'), solid(), 'info-parallelPropcessing'],
      't': [sprite('surprise'), solid(), 'info-teaching'],
      '}': [sprite('unboxed'), solid()],
      '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
      ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
      '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
      '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
      '^': [sprite('evil-shroom'), solid(), 'dangerous'],
      '#': [sprite('mushroom'), solid(), 'mushroom', body()],
      '!': [sprite('blue-block'), solid(), scale(0.5)],
      '£': [sprite('blue-brick'), solid(), scale(0.5)],
      'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
      '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
      'x': [sprite('blue-steel'), solid(), scale(0.5)],
  
    }
  
    const gameLevel = addLevel(maps[level], levelCfg)
    instructions = add([
        text("Find out more about me!\n\n Move around with arrow keys\n\nJump with space to learn more from the boxes :) \n\n Don't get hit by goombas - it's dangerous out there"),
        pos(20, 250),
        layer('ui'),
        {
        }
        ])


    if(level == 0){
        //this exists for the purpose of work history. main landing page when user loads

    

    const aboutMeLvl1= add([
        text("Michael Shlega\n\n Level 1: Work History"),
        pos(30, 6),
        layer('ui'),
        {
        }
    ])

    const pipeInfo= add([
        text("Check out the next level for my projects \n\n and extra curriculars!"),
        pos(1000, 20),
        layer('ui'),
        {
        }
    ])
    }


    if(level == 1){
        //projects and extracurriculars
    }
  
    function big() {
      let timer = 0
      let isBig = false
      return {
        update() {
          if (isBig) {
            CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
            timer -= dt()
            if (timer <= 0) {
              this.smallify()
            }
          }
        },
        isBig() {
          return isBig
        },
        smallify() {
          this.scale = vec2(1)
          CURRENT_JUMP_FORCE = JUMP_FORCE
          timer = 0
          isBig = false
        },
        biggify(time) {
          this.scale = vec2(2)
          timer = time
          isBig = true     
        }
      }
    }
  
    const player = add([
      sprite('mario'), solid(),
      pos(30, 0),
      body(),
      big(),
      origin('bot')
    ])
  
    action('mushroom', (m) => {
      m.move(20, 0)
    })
  
    player.on("headbump", (obj) => {
        
      if(obj.is("block"))
        gameLevel.destroy(obj)
      
        
      if (obj.is('coin-surprise')) {
        //collides with a suprise box meant to be a coin. repurpose for displaying work history
        if(level==0){
            destroy(instructions)
        }
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
 
        const electronicArts= add([
            text("Electronic Arts C++ Gameplay Engineer - Jan 2022/ Aug 2022\n\n - Contributed to testing and optimizing player actions and animations by \n\ndeveloping a testbed system, adding player actions, and enabling overnight testing \n\nthrough scripts using efficient data structures and algorithms. Resulted in better test coverage \n\n - Implemented a gameplay feature's animation using the Agile methodology and our game engine's \n\nC++ code, using layered animation tools to minimize bugs and help the team\n\n hit the beta phase one month earlier. \n\n - Integrated a prototype tool to track data changes at runtime and output \n\n debug data during gameplay, improving overall system efficiency and debugging capabilities", 6),
            pos(30, 250),
            layer('ui'),
            {
            }
        ])

        
      }
      if (obj.is('mushroom-surprise')) {
        gameLevel.spawn('#', obj.gridPos.sub(0, 1))
        destroy(obj)
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
 
        const rcmp= add([
            text("Royal Canadian Mounted Police - May 2021/Sep 2021 \n\n - Redesigned and implemented a C program to improve the time efficiency of communication\n\n between Raspberry Pi's, increasing robustness and improving time efficiency from O(n) to O(logn)\n\n -Implemented and debugged multithreaded code to prevent race conditions \n\n, deadlocks, and zombie processes, leading to improved performance in testing \n\n -Utilized inter-process communication and a server-client architecture to enable distributed processing \n\n - Thoroughly documented work and carried out basic unit testing for coverage \n\n - Utilised Wireshark for packet analysis with Wireguard VPN communication tunnelling \n\n and Github for version control ", 6),
            pos(350, -10),
            layer('ui'),
            {
            }
        ])
      }
      if (obj.is('research-surprise')) {
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
 
        const infoPipe= add([
            text("Research Assistant HCI Lab - Sep 2021/Dec 2023 \n\n - Published first author paper in Human Computer Interaction area for a Springer journal titled \n\n 'Users, Smart Homes, and Digital Assistants: Impact of Technology Experience and Adoption' \n\n - Presented a paper on this topic to over 300 participants at the HCII international research conference \n\n in July 2022,  and it was one of the most attended sessions at the conference \n\n - Spent two years collecting data and conducting statistical analysis, utilizing \n\n both quantitative tests and qualitative methods \n\n - Participated in peer review committees for other papers at the conference ", 6),
            pos(700, 250),,
            layer('ui'),
            {
            }
        ])
      }


      if (obj.is('info-unrealEngine')) {
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
        destroy(instructions)
        const unreal= add([           
            text("BFME: Reforged C++ Unreal 5 Developer - February 2023/Present \n\n Part of the Battle For Middle Reforged Team to remake an older game in \n\n Unreal Engine 5. Spent time learning Unreal Engine 5, working with \n\n Blueprint and combining  that with C++ code resulting in a feature \n\ncontribution to the community code base ", 6),
            pos(30, 250),
            layer('ui'),
            {
            }
        ])
        //talk about experience with the unreal engine 
      }

      if (obj.is('info-teaching')) {
        gameLevel.spawn('}', obj.gridPos.sub(0,0))
 
        //talk about expereince with TAing

        const rcmp= add([
            text("Teaching Assistant - Sep 2020/Sep 2022 \n\n - Acted as a mentor and leader for students in an accelerated \n\n introduction to programming course teaching the basics of Java and Python. \n\n - Created workshops to teach basic data structures and OOP principles \n\n Taught lectures and disucsses decompositional thinking as well as space + efficiency concepts \n\n Nominated for Departmental Outstanding TA Award", 6),
            pos(350, -10),
            layer('ui'),
            {
            }
        ])
        }
       
        if (obj.is('info-parallelPropcessing')) {
              gameLevel.spawn('}', obj.gridPos.sub(0,0))
              const parallelp= add([
              text("Parallel Processing For Edge Detection \n\n - Pet project to further understand parallelism concepts and ideas \n\n - Reimplemented the Sobel edge detection algorithm in Python with multiple parallel architectural \n\n approaches resulting in efficiency increases ranging from factors of 2 to 13, \n\n which was close to optimal speedup based on core availability \n\n - Compared and contrasted the approaches of SISD, SIMD, MIMD, MISD \n\n based on efficiency, ease of implementation, optimal speedup comparison  ", 6),
              pos(500, 250),
              layer('ui'),
              {
              }])
            //talk about parallel processing project
        }
    })
  
    player.collides('mushroom', (m) => {
      destroy(m)
      player.biggify(6)
    })
  
    player.collides('coin', (c) => {
      destroy(c)
      scoreLabel.value++
      scoreLabel.text = scoreLabel.value
    })
  
    action('dangerous', (d) => {
      d.move(-ENEMY_SPEED, 0)
    })
  
    player.collides('dangerous', (d) => {
      if (isJumping) {
        destroy(d)
      } else {
        go('lose')
      }
    })
  
    player.action(() => {
      camPos(player.pos)
      if (player.pos.y >= FALL_DEATH) {
        go('lose')
      }
    })
  
    player.collides('pipe', () => {
      keyPress('down', () => {
        go('game', {
          level: (level + 1) % maps.length,
        })
      })
    })
  
    keyDown('left', () => {
      player.move(-MOVE_SPEED, 0)
    })
  
    keyDown('right', () => {
      player.move(MOVE_SPEED, 0)
    })
  
    player.action(() => {
      if(player.grounded()) {
        isJumping = false
      }
    })
  
    keyPress('space', () => {
      if (player.grounded()) {
        isJumping = true
        player.jump(CURRENT_JUMP_FORCE)
      }
    })
  })
  
  scene('lose', () => {
    add([text("Try not to fall off exploring \n\n - the goombas are aggresive. \n Refresh to go again!", 14), origin('center'), pos(width()/2, height()/ 2)])
  })
  
  start("game", { level: 0, score: 0})
  
