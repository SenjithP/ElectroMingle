import CallIdModel from "../models/meetingSchema.js";

export const saveCallId = async (req, res) => {
  try {
    const { id, signalData } = req.body;
    await CallIdModel.create({ key: id, value: signalData });
    res.status(200).send(true);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

export const getCallId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CallIdModel.findOne({ key: id }).exec();
    const code = result ? result.value : null;
    res.status(200).send({ code });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};
