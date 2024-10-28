import * as Node from "./Nodes";

export const nodeTypes = {
  source: Node.Source,
  invoce: Node.Action,
  centerprice: Node.Action,
  centerpricepayment: Node.Condition,
  end: Node.End,
  empty: Node.Empty,
};
