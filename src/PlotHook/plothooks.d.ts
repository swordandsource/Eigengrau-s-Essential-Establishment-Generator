type Town = import('../lib/town/_common').Town
type NPC = import('../lib/npc-generation/_common').NPC

interface Setup {
  plothooks: Plothook[]
}

type PlothookType = 'event' | 'paper'

interface QuestGiver {
  object: string
  type: string | string[] // should be an enum
}

interface Plothook {
  summary: string
  type: PlothookType[]
  exclusions?(town: Town, npc?: NPC): boolean,
  function(town?: Town): string,
  probability?: number
  questGiver?: QuestGiver
}
