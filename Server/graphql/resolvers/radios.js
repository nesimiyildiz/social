const { UserInputError, AuthenticationError } = require('apollo-server')
const Radio = require('../../models/Radio')
const checkAuth = require('../../utils/check-auth')

module.exports = {
  Query: {
    async getAllRadio() {
      try {
        const radios = await Radio.find().sort({ radioName: 1 })
        return radios
      } catch (error) {
        throw new Error(error)
      }
    },
    async getRadio(_, { radioId }) {
      try {
        const radio = await Radio.findOne({ id: radioId })
        return radio
      } catch (error) {
        throw new Error(error)
      }
    },
  },
  Mutation: {
    addRadio: async (
      _,
      { userId, radioName, radioPath, radioLogoPath },
      context,
    ) => {
      const user = checkAuth(context)
      const radios = await Radio.findOne({ radioName: radioName })
      if (user.id === userId) {
        if (!radios) {
          const newRadio = new Radio({
            radioName,
            radioLogoPath,
            radioPath,
            createdDate: new Date().toISOString(),
            username: user.username,
            user: user.id,
          })
          await newRadio.save()
          return newRadio
        } else {
          throw new UserInputError('Radyo Kayıtlı')
        }
      } else {
        throw new AuthenticationError('Yetkisiz Kayıt')
      }
    },
    updateRadio: async (
      _,
      { userId, radioID, radioName, radioPath, radioLogoPath },
      context,
    ) => {
      const user = checkAuth(context)
      const radios = await Radio.findById(radioID)
      if (user.id === userId) {
        const newRadio = {
          radioName,
          radioLogoPath,
          radioPath,
        }

        await radios.updateOne(newRadio)
        return radios
      } else {
        throw new AuthenticationError('Kullanıcı Bulunamadı')
      }
    },
    deleteRadio: async (_, { userId, radioID }, context) => {
      const user = checkAuth(context)
      if (user.id === userId) {
        try {
          const radio = await Radio.findById(radioID)
          if (radio) {
            await radio.delete()
            return 'Radyo Silindi'
          }else{
              return "Radyo Mevcut Değil"
          }
        } catch (error) {
          throw new Error(error)
        }
      } else {
        throw new AuthenticationError('Yetkisiz İşlem')
      }
    },
  },
}
