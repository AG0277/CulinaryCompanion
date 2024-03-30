import React from "react";

interface Props {
  measures: {
    metric: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
    us: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
  };
  name: string;
}

const RecipeIngredient: React.FC<Props> = ({
  measures,
  name,
}: Props): JSX.Element => {
  return (
    <div className="flex">
      <p className="font-bold mr-1">
        {measures.metric.amount} {measures.metric.unitShort}
      </p>
      {name}
    </div>
  );
};

export default RecipeIngredient;
