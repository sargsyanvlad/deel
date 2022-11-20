import { DataTypes as Sequelize } from "sequelize";

const ContractModel = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  terms: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("new", "in_progress", "terminated"),
  },
};

const ContractsAssociation = (models) => {
  models.Contracts.belongsTo(models.Profiles, {
    as: "Contractor",
  });
  models.Contracts.belongsTo(models.Profiles, {
    as: "Client",
  });
  models.Contracts.hasMany(models.Jobs, {});
};

const ContractOptions = {
  timestamps: true,
  schema: "public",
  freezeTableName: true,
};

export const getModel = (seq) => {
  const model = seq.define("Contracts", ContractModel, ContractOptions);
  model.associate = ContractsAssociation;
  return model;
};
