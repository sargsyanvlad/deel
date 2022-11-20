import { DataTypes as Sequelize } from "sequelize";

const JobModel = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
  },
  paid: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  paymentDate: {
    type: Sequelize.DATE,
  },
};

const JobOptions = {
  timestamps: true,
  schema: "public",
  freezeTableName: true,
};

const JobAssociations = (model) => {
  model.Jobs.belongsTo(model.Contracts);
};

export const getModel = (seq) => {
  const model = seq.define("Jobs", JobModel, JobOptions);
  model.associate = JobAssociations;
  return model;
};
