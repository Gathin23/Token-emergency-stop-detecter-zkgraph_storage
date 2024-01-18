//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Account, Block, Slot } from "@hyperoracle/zkgraph-lib";

let addr = Bytes.fromHexString('0xdAC17F958D2ee523a2206206994597C13D831ec7');
let key = Bytes.fromHexString('0x0000000000000000000000000000000000000000000000000000000000000000');

export function handleBlocks(blocks: Block[]): Bytes{
  // get source Account object by address
  let acct: Account = blocks[0].account(addr);

  // require on key existence
  require(acct.hasSlot(key));

  // #1 get source Slot object by key
  let value:Bytes = acct.storage(key);

  // #2 get source Slot object by key
  let slot: Slot = acct.slots[acct.getSlotId(key)]

  // this 2 ways to get slot value are equal effect, so always true
  require(value == slot.value);

  //get the 21st byte from the value
  let pausable: Bytes = value.slice(20, 20);

  // return the slot value of the given block
  return pausable;
}