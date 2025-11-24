const {polsModel} =  require("../Models/polsModel")
const jwt = require('jsonwebtoken')


module.exports.createPolls = async(req,res)=>{
    try {
        const { context, user, communityId, options } = req.body;
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const id = decoded.id
        const poll = new polsModel({
            context:context,
            communityId:communityId,
            options: options.map(option => ({ content: option })),
            user:id
        });

        const newPoll = await poll.save()

        res.status(201).json({ message: 'Poll created successfully', poll: newPoll })
    } catch (error) {
        console.error('Error creating poll:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports.pollVote = async (req, res) => {
    try {
        const extractedJWT = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(extractedJWT, process.env.Skey);
        const voterID = decoded.id;
        const pollId = req.params.pId;
        const optionId = req.params.oId;

        const poll = await polsModel.findById(pollId);

        const selectedOption = poll.options.find(option => option._id.equals(optionId));

        if (!selectedOption) {
            return res.status(404).json({ message: 'Option not found' });
        }

        const hasVotedForOption = selectedOption.selected.includes(voterID);

        if (hasVotedForOption) {
            selectedOption.selected = selectedOption.selected.filter(selectedId => !selectedId.equals(voterID));
            await poll.save();
            return res.status(200).json({ message: 'Vote removed successfully', poll });
        }

        const previousOption = poll.options.find(option => option.selected.includes(voterID));

        if (previousOption) {
            previousOption.selected = previousOption.selected.filter(selectedId => !selectedId.equals(voterID));
        }

        selectedOption.selected.push(voterID);

        await poll.save();

        res.status(200).json({ message: 'Vote added successfully', poll });
    } catch (error) {
        console.log('Error voting: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAllPolls = async(req,res)=>{
    try{
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const userId = decoded.id
        const cId = req.params.id

        const allPolls = await polsModel.find({ communityId: cId }).populate({
            path: 'options.selected',
            model: 'signupmodel' ,
            select:"-password"
        }).populate({
            path:'user',
            model:'signupmodel',
            select:"-password"
        })
        res.status(200).json({ message: 'Polls Retrived Successfully', poll: allPolls })


    }catch(error){
        console.log('Error voting: ', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports.getMyPolls = async(req,res)=>{
    try{
        const extrackingJWT = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(extrackingJWT,process.env.Skey,'' ,false)
        const userId = decoded.id
        const cId = req.params.id

        const myPolls = await polsModel.find({user:userId,communityId:cId}).populate({
            path: 'options.selected',
            model: 'signupmodel' ,
            select:"-password"
        }).populate({
            path:'user',
            model:'signupmodel',
            select:"-password"
        })


        res.status(200).json({ message: 'Polls Retrived Successfully', poll: myPolls })


    }catch(error){
        console.log('Error voting: ', error)
        res.status(500).json({ message: 'Internal server error' });
    }
}