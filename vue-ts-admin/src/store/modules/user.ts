import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    setToken(token)
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public Login(userInfo: { username: string, password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    let taht = this
    login(username, password).then(res => {
      const data = res.data
      console.log('auth respnose', data)
      taht.SET_TOKEN(data.access_token)
    })
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public GetUserInfo() {
    if (this.token !== '') {
      let taht = this
      getUserInfo({ /* Your params here */ }).then(res => {
        const data = res.data
        if (!data) {
          throw Error('Verification failed, please Login again.')
        }
        const { roles, name } = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          throw Error('GetUserInfo: roles must be a non-null array!')
        }
        taht.SET_ROLES(roles)
        taht.SET_NAME(name)
        // this.SET_AVATAR(avatar)
        // this.SET_INTRODUCTION(introduction)
      })
    }
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
